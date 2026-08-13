import numpy as np

from app.services.embedding_service import generate_embedding


def cosine_similarity(a, b):
    """
    Calculate cosine similarity between two embedding vectors.
    """

    a = np.array(a)
    b = np.array(b)

    # Prevent division by zero
    denominator = (
        np.linalg.norm(a) * np.linalg.norm(b)
    )

    if denominator == 0:
        return 0.0

    return float(
        np.dot(a, b) / denominator
    )


def find_similar_chunks(
    query: str,
    chunks,
    top_k: int = 5,
    similarity_threshold: float = 0.20,
):
    """
    Find the most relevant document chunks for a user query.

    Args:
        query:
            User's question.

        chunks:
            Document chunks belonging to the project.

        top_k:
            Maximum number of chunks to return.

        similarity_threshold:
            Minimum similarity score required for a chunk
            to be considered relevant.

    Returns:
        A list of tuples:

        [
            (similarity_score, chunk),
            ...
        ]
    """

    # --------------------------------------------------
    # 1. Generate embedding for user's question
    # --------------------------------------------------

    query_embedding = generate_embedding(query)

    scored_chunks = []

    # --------------------------------------------------
    # 2. Compare question with every chunk
    # --------------------------------------------------

    for chunk in chunks:

        if chunk.embedding is None:
            continue

        try:
            score = cosine_similarity(
                query_embedding,
                chunk.embedding,
            )

        except Exception as e:
            print(
                f"Failed to compare chunk "
                f"{chunk.chunk_index}: {e}"
            )
            continue

        scored_chunks.append(
            {
                "score": score,
                "chunk": chunk,
            }
        )

    # --------------------------------------------------
    # 3. Sort by highest similarity
    # --------------------------------------------------

    scored_chunks.sort(
        key=lambda item: item["score"],
        reverse=True,
    )

    # --------------------------------------------------
    # 4. Apply similarity threshold
    # --------------------------------------------------

    relevant_chunks = [
        item
        for item in scored_chunks
        if item["score"] >= similarity_threshold
    ]

    # --------------------------------------------------
    # 5. Keep only top K chunks
    # --------------------------------------------------

    relevant_chunks = relevant_chunks[:top_k]

    # --------------------------------------------------
    # 6. Debug information
    # --------------------------------------------------

    print("\n========== RAG RETRIEVAL ==========")

    print(f"Query: {query}")

    print(
        f"Total chunks searched: "
        f"{len(scored_chunks)}"
    )

    print(
        f"Relevant chunks: "
        f"{len(relevant_chunks)}"
    )

    for item in relevant_chunks:

        chunk = item["chunk"]
        score = item["score"]

        print(
            f"Chunk {chunk.chunk_index} "
            f"| Similarity: {score:.4f}"
        )

    print("===================================\n")

    return relevant_chunks