# Igniters

[The App](https://globtrotters-igniters.herokuapp.com/)

## Description

A repository of women's rights organizations, Igniters is a power tool for women around the world! 💪 Users can search and review organizations, save useful resources, and create a page for their own organization.

## User Stories

- 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- Signup: As an anon I can sign up in the platform so that I can start saving, reviewing and creating organizations.
- Login: As a user I can login to the platform so that I can see my saved, review, edit and create organizations
- Logout: As a user I can logout from the platform so no one else can use it
- Add organizations: As a user I can add an organization so that I can share it with the community
- Search Organizations: As a user I can search for organizations by name, language, service or location
- List all organizations: As a user I can see a list of all organizations
- Add to favorites: As a user I want to add an organization as a resource
- See resources: As a user I want to see my saved organizations

## Items accomlished from Backlog

- Geo location: See organizations in a map
- About page

## Backlog

- Upload with scroll
- Chat form

## Client/Frontend

### React Router Routes (React App)

| Path               | Component                            | Permissions                 | Behavior                                                           |
| ------------------ | ------------------------------------ | --------------------------- | ------------------------------------------------------------------ |
| `/`                | Navbar, Home, Footer                 | public `<Route>`            | Home page, links to signin and signup                              |
| `/auth/signup`     | Navbar, SignupPage, Footer           | public `<Route>`            | Signup form, link to login, navigate to question form after signup |
| `/auth/login `     | Navbar, LoginPage, Footer            | public `<AnonRoute>`        | Login form, link to signup, navigate to profile after login        |
| `/logout`          | n/a                                  | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session                  |
| `/profile`         | NavBar, UserDetails, Footer          | user only `<PrivateRoute>`  | Shows some info about user and shows his projects                  |
| `/profile/edit`    | NavBar, ProfileEditForm, Footer      | user only `<PrivateRoute>`  | Edit profile details                                               |
| `/search-orgs`     | NavBar, OrgList, Footer              | public `<PrivateRoute>`     | Shows all organization                                             |
| `/orgs/create `    | NavBar, AddOrganization, Footer      | user only `<PrivateRoute>`  | Create your own organization                                       |
| `/org/:id`         | Navbar, OrgDetail, AddReview, Footer | user only `<PrivateRoute>`  | Render a single organization                                       |
| `/org/:id/edit`    | Navbar, OrgEdit, Footer              | owner only `<PrivateRoute>` | Edit and delete your organization                                  |
| `/search-orgs/q=?` | Navbar, SearchResults, Footer        | owner only `<PrivateRoute>` | Search organizations                                               |

### Pages

- About Us
- Home Page (anon/user)
- Sign Up (anon only)
- Log In (anon only)
- Organizations List (anon/user)
- Organization Details (user only)
- Organizations Near User (user only)
- Add Organization (user only)
- Edit Organization (owner only)
- Organization Detail (user only)
- Profile (user only)
- Edit Profile (user only)
- My Organizations (user only)
- Search (anon/user)
- 404 Page (user)

### Components

- AddReview
- AllOrganizationsMap
- AnonRoute
- EditReviewCard
- Footer
- Google Button
- My Created Organizations
- My Saved Organizations
- Navbar
- Navbar Anon
- Navbar Private
- Organization Cards (search and list all)
- Organization Details Map
- Organizations Near User Map
- Private Route
- Scroll To Top
- Review card
- ScrollToTop

### Services

- Auth Service
- Localisation: Mabox API
- Search Service
- React Google LogIn

## Server

### Models

```javascript
{
    name: {
      type: String,
      required: true,
    }, //required
    country: {
      type: String,
      required: true,
    }, //required
    city: {
      type: String,
      required: true,
    }, //required
    street: {
      type: String,
    }, //not required
    email: {
      type: String,
      required: true,
    }, //required
    categories: {
      type: [String],
    }, //not required
    mainIdiom: {
      type: String,
    }, //not required
    description: {
      type: String,
    }, //not required
    url: {
      type: String,
    }, //not required
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
        default: [],
      },
    ],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  }
```

#### review model(schema)

```javascript
{
  review: {
    type: String,
    required: false,
    maxlength: 500
  },
  rating: {
    type: Number,
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true
}
```

#### User model(schema)

```javascript
{
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    default: "unknown",
  },
  savedOrganizations: [{
    type: Schema.Types.ObjectId,
    ref: "Organization",
    default: [],
  }, ],
  username: {
    type: String,
  }
}
```

## Links

### Wireframes

[Whimsical](https://whimsical.com/BnwoEhQR9ER8CcNtfSE3w7)

### Trello

[Trello](https://trello.com/b/eAbJNkXd/project-3)

### Git

[Github](https://github.com/monikageiger/project3)

### Deploy Link

[The App](https://globtrotters-igniters.herokuapp.com/)

### Slides Link

[Slides](https://docs.google.com/presentation/d/1B9DtmqGqxgoENpObGjUfKBKUKTnaFYYmJ8Azzb9K0_I/edit)

### Team

[Ana Martins](https://github.com/aafmartins)
[Monika Geiger](https://github.com/monikageiger)
[Osvaldo Picazo](https://github.com/OsvaldoPicazo)
[Flavian Albert](https://github.com/Hribu)
