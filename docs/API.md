## ELECTRON API

### catalogue item

#### getListCatalogue

CatalogueItem:

```
{
    id: UUID,
    name: string,
    description: JSON for richEditor (may need JSON.parse)
}
```

```
getListCatalogue(event, searchPhase?: string, grouped?: boolean) -> CatalogueItem[]
```

or

```
{
    grouped: {
        <category name>: CatalogueItem[],
        ...
    },
    groupless: CatalogueItem[]
}
```

#### createItem

```
createItem(event, { name, description, categoryIds }) -> str(error JSON) | undefined
```

#### getDetailedItem

```
getDetailedItem(event, id) -> str{
    id: UUID
    name: string
    description: JSON for richEditor
    createdAt: string
    updatedAt: string:
    Categories: [
        id: UUID,
        name: string,
        description: string,
        updatedAt: string
    ]
}
```

#### destroyItemById

```
destroyItemById(event, id) -> undefined
```

#### updateItem

```
updateItem(event, id, content: item properties) -> undefined | error
```

### category

#### getListCatalogue

```
getListCatalogue(event, searchPhase) -> {
    id: UUID,
    name: string,
    description: JSON for richEditor (may need JSON.parse)
}
```

#### createCategory

```
createCategory(event, name, description = "") -> {
    id: UUID,
    name: string,
    description: JSON for richEditor (may need JSON.parse)
}
```

#### getDetailedCategory

```
getDetailedCategory(event, id) -> str{
    id: UUID,
    name: string,
    description: string,
    updatedAt: string
}
```

#### destroyCategoryById

```
destroyCategoryById(event, id) -> undefined
```

#### updateCategory

```
updateCategory(event, id, content) -> undefined
```
