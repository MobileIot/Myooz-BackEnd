# API Doc

[TOC]

----

## Note

For all requests except `login` and `register`, `sessionKey` should be present in the cookies.  

## User Session

#### GET `/profile/:username` **[Tested]**

Get user profile (avatar).

**Return**

- HTTP 200: Successful.

```json
{
  avatar: image_url // FILE:multipart/form-data
}
```

- HTTP 400: Failed.

```json
{
  message: "error message"
}
```

#### POST `/profile` **[Tested]**

Update user profile (avatar).

**Payload**

```json
{
  avatar: image_data // FILE:multipart/form-data
}
```

**Return**

- HTTP 200: Successful.

```json
{
  avatar: image_url
}
```

- HTTP 400: Failed.

```json
{
  message: "error message"
}
```

#### POST `/login` **[Tested]**
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
```json
{
  avatar: image_url
}
```

 - HTTP 400: Login failed.
```json
{
  message: "error message"
}
```

#### POST `/register` **[Tested]**
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
```json
{
  avatar: image_url
}
```

 - HTTP 400: Register failed.
```json
{
  message: "error message"
}
```

***

## Museum Info

#### GET `/museums/:museum_id`
Get infomation about a museum.

**Return**

 - HTTP 200: Successful.
```json
{
    "id": 2,
    "name": "Carnegie Museum of Art",
    "avatar": "https://vacationidea.com/pix/img25Hy8R/ideas/carnegie-museum-of-art_f.jpg"
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
[
    {
        "id": 1,
        "name": "The Metropolitan Museum of Art",
        "avatar": "https://www.smartdestinations.com/img/pt/dest/Nyc/att/Nyc_Att_The_Metropolitan_Museum_of_Art/gallery/The-Metropolitan-Museum-of-Art-1.jpg"
    },
    {
        "id": 2,
        "name": "Carnegie Museum of Art",
        "avatar": "https://vacationidea.com/pix/img25Hy8R/ideas/carnegie-museum-of-art_f.jpg"
    },
    {
        "id": 3,
        "name": "The Art Institute of Chicago",
        "avatar": "https://urbanmatter.com/chicago/wp-content/uploads/2015/04/Art-Institute-of-Chicago.jpg"
    }
]
```
 - HTTP 400: Failed.
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