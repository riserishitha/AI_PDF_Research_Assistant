import logging

import numpy as np

from app.services.embedding_service import generate_embedding


logger = logging.getLogger(__name__)


# Minimum similarity required for a chunk
DEFAULT_SIMILARITY_THRESHOLD = 0.25

# Maximum number of chunks sent to the LLM
DEFAULT_TOP_K = 5


def cosine_similarity(a, b) -> float:
    """
    Calculate cosine similarity between two embeddings.
    """

    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)

    a_norm = np.linalg.norm(a)
    b_norm = np.linalg.norm(b)

    # Prevent division by zero
    if a_norm == 0 or b_norm == 0:
        return 0.0

    return float(
        np.dot(a, b) / (a_norm * b_norm)
    )


def find_similar_chunks(
    query: str,
    chunks,
    top_k: int = DEFAULT_TOP_K,
    similarity_threshold: float = DEFAULT_SIMILARITY_THRESHOLD,
):
    """
    Find the most relevant document chunks for a query.

    Process:

    Question
        ↓
    Generate query embedding
        ↓
    Compare with document chunk embeddings
        ↓
    Remove low-similarity chunks
        ↓
    Sort by similarity
        ↓
    Return top K chunks
    """

    if not query.strip():
        return []

    # Generate embedding for the user's question
    query_embedding = generate_embedding(query)

    scored_chunks = []

    for chunk in chunks:

        # Skip chunks without embeddings
        if chunk.embedding is None:
            logger.warning(
                "Chunk %s has no embedding. Skipping.",
                chunk.id,
            )
            continue

        try:
            score = cosine_similarity(
                query_embedding,
                chunk.embedding,
            )

        except Exception as exc:
            logger.warning(
                "Failed to calculate similarity for chunk %s: %s",
                chunk.id,
                exc,
            )
            continue

        logger.info(
            "Chunk %s similarity: %.4f",
            chunk.chunk_index,
            score,
        )

        # Ignore weak matches
        if score < similarity_threshold:
            continue

        scored_chunks.append(
            (
                score,
                chunk,
            )
        )

    # Highest similarity first
    scored_chunks.sort(
        key=lambda item: item[0],
        reverse=True,
    )

    # Keep only top K chunks
    selected_chunks = [
        chunk
        for score, chunk in scored_chunks[:top_k]
    ]

    logger.info(
        "Retrieved %s relevant chunks for query.",
        len(selected_chunks),
    )

    return selected_chunks