# API Definitions

The base URL for all API requests is:

`https://example.com`

## User APIs

### `GET /users`

Returns a list of all books in the library.

### Parameters

- `limit` (optional): The maximum number of books to return. Default is 10.
- `offset` (optional): The number of books to skip before starting to return results. Default is 0.

### Response

Returns a JSON object with the following properties:

- `count`: The total number of books in the library.
- `results`: An array of book objects, each with the following properties:
    - `id`: The unique identifier of the book.
    - `title`: The title of the book.
    - `author`: The author of the book.
    - `description`: A brief description of the book.
    - `publication_date`: The publication date of the book.

### Example

Request:

```
GET /books?limit=5&offset=10
```

Response:

```json
{
    "count": 50,
    "results": [
        {
            "id": 11,
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "description": "A novel about the decadent excesses of the Jazz Age.",
            "publication_date": "1925-04-10"
        },
        {
            "id": 12,
            "title": "To Kill a Mockingbird",
            "author": "Harper Lee",
            "description": "A novel about racial injustice in the American South.",
            "publication_date": "1960-07-11"
        },
        ...
    ]
}

```

## Errors

This API uses the following error codes:

- `400 Bad Request`: The request was malformed or missing required parameters.
- `401 Unauthorized`: The API key provided was invalid or missing.
- `404 Not Found`: The requested resource was not found.
- `500 Internal Server Error`: An unexpected error occurred on the server.