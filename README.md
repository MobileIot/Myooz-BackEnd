# API Doc

[TOC]

----

## Note

For all requests except `login` and `register`, `sessionKey` should be present in the cookies.  

## User Session

#### GET `/profile/:username`

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

#### POST `/profile`

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

## Museums

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

## Artists

#### GET `/artists/:artist_id`

Get infomation about an artist.

**Return**

- HTTP 200: Successful.

```json
{
    "id": 1,
    "name": "Claude Monet",
    "avatar": "https://s-media-cache-ak0.pinimg.com/originals/da/1e/f8/da1ef8217982e1250c370460fa2b30d3.jpg"
}
```

- HTTP 400: Failed.

```json
{
  message: "error message"
}
```

#### GET `/artists`

Get a list of artists.

**Return**

- HTTP 200: Successful.

```json
[
    {
        "id": 1,
        "name": "Claude Monet",
        "avatar": "https://s-media-cache-ak0.pinimg.com/originals/da/1e/f8/da1ef8217982e1250c370460fa2b30d3.jpg"
    },
    {
        "id": 2,
        "name": "Vincent van Gogh",
        "avatar": "https://courtauld.ac.uk/wp-content/uploads/port/ol/P-1948-SC-175-tif-10587-e1468233592690.jpg"
    },
    {
        "id": 3,
        "name": "Pablo Picasso",
        "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Portrait_de_Picasso%2C_1908.jpg/230px-Portrait_de_Picasso%2C_1908.jpg"
    }
]
```

- HTTP 400: Failed.

```json
{
  message: "error message"
}
```

------

## Artworks

#### GET `/artwork/:artwork_id`
Get infomation about an artwork.

**Return**

 - HTTP 200: Successful.
```json
{
    "id": 1,
    "name": "Garden at Sainte-Adresse",
    "artist_id": 1,
    "museum_id": 1,
    "year": 1867,
    "description": "Monet spent the summer of 1867 with his family at Sainte-Adresse, a seaside resort near Le Havre. It was there that he painted this buoyant, sunlit scene of contemporary leisure, enlisting his father (shown seated in a panama hat) and other relatives as models. By adopting an elevated viewpoint and painting the terrace, sea, and sky as three distinct bands of high-keyed color, Monet emphasized the flat surface of the canvas. His approach-daring for its time-reflects his admiration for Japanese prints. Twelve years after it was made, Monet exhibited the picture at the fourth Impressionist exhibition of 1879 as Jardin à Sainte-Adresse.",
    "avatar": "https://images.metmuseum.org/CRDImages/ep/web-large/DT48.jpg",
    "room_id": 0
}
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```


#### GET `/artworks?museum_id=?&artist_id=?&room_id=?`
Query artworks with certain conditions (use any combination of museum_id, artist_id and room_id).

**Return**

 - HTTP 200: Successful.
```json
// /artworks?museum_id=1&artist_id=1&room_id=1
[
    {
        "id": 135,
        "name": "La Grenouillère",
        "artist_id": 1,
        "museum_id": 1,
        "year": 1869,
        "description": "During the summer of 1869, Monet and Renoir set up their easels at La Grenouillère, a boating and bathing resort on the Seine River, not far from Paris. Monet noted on September 25, \"I do have a dream, a painting, the baths of La Grenouillère, for which I have made some bad sketches, but it is only a dream. Renoir, who has just spent two months here, also wants to do this painting.\" Among their various depictions of the subject, this composition closely resembles one by Renoir in the Nationalmuseum, Stockholm.",
        "avatar": "https://images.metmuseum.org/CRDImages/ep/web-large/DT833.jpg",
        "room_id": 1
    },
    {
        "id": 137,
        "name": "Spring (Fruit Trees in Bloom)",
        "artist_id": 1,
        "museum_id": 1,
        "year": 1873,
        "description": "Monet made this work in the vicinity of his home in Argenteuil, a village on the Seine northwest of Paris that was a favorite gathering place of the Impressionists. Although the scene has previously been called Plum Blossoms and Apples Trees in Bloom, the type of tree cannot be determined from the flurry of white buds evoked by the artist. The pastel shades of spring and the clear light inspired him to represent nature almost purely in terms of color. This was the first painting by Monet to enter the Museum’s collection, via bequest in 1926.",
        "avatar": "https://images.metmuseum.org/CRDImages/ep/web-large/DT1902.jpg",
        "room_id": 1
    },
    {
        "id": 139,
        "name": "Poppy Fields near Argenteuil",
        "artist_id": 1,
        "museum_id": 1,
        "year": 1875,
        "description": "This work is one of four similar views of the plain of Gennevilliers, just southeast of Argenteuil, which Monet executed in the summer of 1875. He first painted the subject two years earlier in the celebrated Poppies near Argenteuil (Musée d'Orsay, Paris).",
        "avatar": "https://images.metmuseum.org/CRDImages/ep/web-large/DT1034.jpg",
        "room_id": 1
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

## Notes
#### GET `/notes/:note_id`
Get notes for an artwork.

**Return**

 - HTTP 200: Successful.
```json
{
    "id": 2,
    "avatar": "https://myooz.s3.amazonaws.com/WechatIMG192.jpeg",
    "content": "It's a public note.",
    "artwork_id": 1,
    "username": "ztong",
    "public": 1
}
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

#### GET `/notes?museum_id=?&artist_id=?&room_id=?&my_notes_only=<presentOrNot>`
Query notes with certain conditions (use any combination of museum_id, artist_id my_notes_only, and room_id). Returned notes are either public or belong to the user.

**Return**

 - HTTP 200: Successful.
```json
[
    {
        "id": 1,
        "avatar": "https://images.metmuseum.org/CRDImages/ep/web-large/DT48.jpg",
        "content": "It's a private note.",
        "artwork_id": 1,
        "username": "ztong",
        "public": 0,
        "name": "Garden at Sainte-Adresse",
        "artist_id": 1,
        "museum_id": 1,
        "year": 1867,
        "description": "Monet spent the summer of 1867 with his family at Sainte-Adresse, a seaside resort near Le Havre. It was there that he painted this buoyant, sunlit scene of contemporary leisure, enlisting his father (shown seated in a panama hat) and other relatives as models. By adopting an elevated viewpoint and painting the terrace, sea, and sky as three distinct bands of high-keyed color, Monet emphasized the flat surface of the canvas. His approach-daring for its time-reflects his admiration for Japanese prints. Twelve years after it was made, Monet exhibited the picture at the fourth Impressionist exhibition of 1879 as Jardin à Sainte-Adresse.",
        "room_id": 0
    },
    {
        "id": 1,
        "avatar": "https://images.metmuseum.org/CRDImages/ep/web-large/DT48.jpg",
        "content": "It's a public note.",
        "artwork_id": 1,
        "username": "ztong",
        "public": 1,
        "name": "Garden at Sainte-Adresse",
        "artist_id": 1,
        "museum_id": 1,
        "year": 1867,
        "description": "Monet spent the summer of 1867 with his family at Sainte-Adresse, a seaside resort near Le Havre. It was there that he painted this buoyant, sunlit scene of contemporary leisure, enlisting his father (shown seated in a panama hat) and other relatives as models. By adopting an elevated viewpoint and painting the terrace, sea, and sky as three distinct bands of high-keyed color, Monet emphasized the flat surface of the canvas. His approach-daring for its time-reflects his admiration for Japanese prints. Twelve years after it was made, Monet exhibited the picture at the fourth Impressionist exhibition of 1879 as Jardin à Sainte-Adresse.",
        "room_id": 0
    }
]
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

#### POST `/notes/`
Add a note (notes) for an artwork.

**Payload**

```json
[{
  content: "Test note",
  artwork_id: 1,
  is_public: 1/0,
  avatar: image_file // FILE
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

#### POST `/favorites/:note_id`
Favorite a note.

**Return**

 - HTTP 200: Successful.
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```

#### GET `/favorites/:note_id`

Get note favorite count.

**Return**

- HTTP 200: Successful.

```json
{
  count: int
}
```

- HTTP 400: Failed.

```json
{
  message: "error message"
}
```

***

#### GET `/favorites`

Get my favorited notes.

**Return**

 - HTTP 200: Successful.
```json
[
    {
        "id": 1,
        "username": "ztong",
        "note_id": 1
    },
    {
        "id": 2,
        "username": "ztong",
        "note_id": 2
    }
]
```
 - HTTP 400: Failed.
```json
{
  message: "error message"
}
```