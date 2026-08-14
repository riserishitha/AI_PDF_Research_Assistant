import numpy as np

from app.services.embedding_service import generate_embedding


def cosine_similarity(a, b):
    """
    Calculate cosine similarity between two embedding vectors.
    """

    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)

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
    Find the most relevant document chunks
    for a user query.
    """

    print("\n========== RAG RETRIEVAL ==========")
    print("Query:", query)
    print("Total chunks received:", len(chunks))

    # --------------------------------------------------
    # 1. Generate embedding for query
    # --------------------------------------------------

    query_embedding = generate_embedding(query)

    print(
        "Query embedding generated:",
        query_embedding is not None
    )

    if query_embedding is None:
        print("ERROR: Query embedding is None")
        print("===================================\n")
        return []

    print(
        "Query embedding length:",
        len(query_embedding)
    )

    scored_chunks = []

    # --------------------------------------------------
    # 2. Compare query with every chunk
    # --------------------------------------------------

    for chunk in chunks:

        print(
            f"\nChecking chunk {chunk.chunk_index}"
        )

        if chunk.embedding is None:

            print(
                "Embedding exists: False"
            )

            continue

        print(
            "Embedding exists: True"
        )

        print(
            "Stored embedding length:",
            len(chunk.embedding)
        )

        try:

            score = cosine_similarity(
                query_embedding,
                chunk.embedding,
            )

            print(
                f"Similarity: {score:.4f}"
            )

            scored_chunks.append(
                {
                    "score": score,
                    "chunk": chunk,
                }
            )

        except Exception as e:

            print(
                f"Failed to compare chunk "
                f"{chunk.chunk_index}: {e}"
            )

    # --------------------------------------------------
    # 3. Sort by similarity
    # --------------------------------------------------

    scored_chunks.sort(
        key=lambda item: item["score"],
        reverse=True,
    )

    # --------------------------------------------------
    # 4. Print ALL scores
    # --------------------------------------------------

    print("\n----- ALL SIMILARITY SCORES -----")

    for item in scored_chunks:

        print(
            f"Chunk {item['chunk'].chunk_index}"
            f" -> {item['score']:.4f}"
        )

    # --------------------------------------------------
    # 5. Apply threshold
    # --------------------------------------------------

    relevant_chunks = [
        item
        for item in scored_chunks
        if item["score"] >= similarity_threshold
    ]

    # --------------------------------------------------
    # 6. Keep top K
    # --------------------------------------------------

    relevant_chunks = relevant_chunks[:top_k]

    # --------------------------------------------------
    # 7. Final debug information
    # --------------------------------------------------

    print("\n----- RETRIEVAL RESULT -----")

    print(
        "Similarity threshold:",
        similarity_threshold
    )

    print(
        "Relevant chunks:",
        len(relevant_chunks)
    )

    for item in relevant_chunks:

        chunk = item["chunk"]
        score = item["score"]

        print(
            f"Selected chunk {chunk.chunk_index}"
            f" | Similarity: {score:.4f}"
        )

    print("===================================\n")

    return [
        item["chunk"]
        for item in relevant_chunks
    ]