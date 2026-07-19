import numpy as np

from app.services.embedding_service import generate_embedding


def cosine_similarity(a, b):
    a = np.array(a)
    b = np.array(b)

    return np.dot(a, b) / (
        np.linalg.norm(a) * np.linalg.norm(b)
    )


def find_similar_chunks(
    query: str,
    chunks,
    top_k: int = 5,
):
    query_embedding = generate_embedding(query)

    scored_chunks = []

    for chunk in chunks:
        print("Embedding exists:", chunk.embedding is not None)

        if chunk.embedding is None:
            continue

        score = cosine_similarity(
            query_embedding,
            chunk.embedding,
        )

        print(f"Chunk {chunk.chunk_index}: {score}")

        scored_chunks.append(
            (
                score,
                chunk,
            )
        )

    scored_chunks.sort(
        key=lambda x: x[0],
        reverse=True,
    )

    return [
        chunk
        for score, chunk in scored_chunks[:top_k]
    ]