from services.resource_service import ResourceService

resources = ResourceService.get_resources()

print(
    f"Loaded {len(resources)} resources\n"
)

for resource in resources[:5]:

    print(resource.title)

    print(resource.category)

    print(resource.source)

    print(resource.url)

    print("-" * 50)