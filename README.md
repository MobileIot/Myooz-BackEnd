# API Doc

[TOC]

----

## User Session

#### GET `/profile/:username` **[Tested]**

Get user profile (avatar).gs

**Payload**

```json
{
  avatar: image_url
}
```

**Return**

- HTTP 200: Successful.
- HTTP 400: Failed.

```json
{
  message: "error message"
}
```

#### POST `/profile`

Update user profile (avatar).

**Payload**

```json
{
  image: image_url
}
```

**Return**

- HTTP 200: Successful.
- HTTP 400: Failed.

```json
{
  message: "error message"
}
```

#### POST `/login`
Login to an existing account.

**Payload**

```json
{
  username: "meow",
  password: "meow"
}
```
**Return**

 - HTTP 200: Login successful.
 - HTTP 400: Login failed.
```json
{
  message: "error message"
}
```

#### POST `/register`
Create a new account.

**Payload**

```json
{
  username: "meow",
  password: "meow"
}
```
**Return**

 - HTTP 200: Register successful.
 - HTTP 400: Register failed.
```json
{
  message: "error message"
}
```

***

## Art Info

#### GET `/art/:art_id`
Get infomation about an artwork.

**Return**

 - HTTP 200: Successful.
```json
// More fields TBD
{
  id: art_id,
  title: title,
  image: image_url,
  description: description,
  is_favorite: true_or_false
}
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```


#### GET `/museums`
Get a list of museums.

**Return**

 - HTTP 200: Successful.
```json
// More fields TBD
[{
  id: museum_id,
  name: museum_name
}]
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

***

## Nearby

#### GET `/nearby/beacons/:beacon_id`
Get artworks near a beacon.

**Return**

 - HTTP 200: Successful.
```json
// More fields TBD
[{
  id: art_id,
  title: title,
  image: image_url
}]
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

#### GET `/nearby/museums/:museum_id`
Get artworks in a museum.

**Return**

 - HTTP 200: Successful.
```json
// More fields TBD
[{
  id: art_id,
  title: title,
  image: image_url
}]
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

***

## Notes
#### GET `/notes/:art_id`
Get notes for an artwork.

**Return**

 - HTTP 200: Successful.
```json
// More fields TBD
[{
  id: note_id,
  content: content,
  image: image_url
}]
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

#### GET `/notes`
Get notes the user has taken.

**Return**

 - HTTP 200: Successful.
```json
// More fields TBD
[{
  id: museum_id,
  name: museum_name,
  notes: [{
    id: note_id,
    content: content,
    image: image_url,
    time: time,
    likes: int
  }]
}]
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

#### POST `/notes/:art_id`
Add a note (notes) for an artwork.

**Payload**

```json
[{
  image: image,
  content: content,
  public: trueOrFalse
}]
```
**Return**

 - HTTP 200: Successful.
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

***

## Favorites

#### POST `/favorites/:art_id`
Favorite an artwork.

**Payload**

// None

**Return**

 - HTTP 200: Successful.
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

#### GET `/favorites`
Get all favorited artworks.

**Return**

 - HTTP 200: Successful.
```json
[{
  id: museum_id,
  name: museum_name,
  art: [{
    id: art_id,
    title: title,
    image: image_url
  }]
}]
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```