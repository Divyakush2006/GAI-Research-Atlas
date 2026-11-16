from services.vector_store import VectorStore

query = input("Enter search query: ")

results = VectorStore.search(query)

print("\nTop Results:\n")

for i, doc in enumerate(results["documents"][0]):

    print("=" * 60)
    print(f"Result {i+1}")
    print(doc[:500])
    print()