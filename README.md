# Igniters

## Description

A repository of women's rights organizations, NAME OF APP is a power tool for women around the world! 💪 Everyone can search for organizations and users are able to save useful resources, review organizations, as well as create a page for their own organization.

## User Stories

404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
Signup: As an anon I can sign up in the platform so that I can start saving, reviewing and creating organizations.
Login: As a user I can login to the platform so that I can see my saved, review, edit and create organizations
Logout: As a user I can logout from the platform so no one else can use it
Add organizations: As a user I can add an organization so that I can share it with the community
Search Organizations: As a user I can search for organizations by name, language, service or location
List all organizations: As a user I can see a list of all organizations
Add to favorites: As a user I want to add an organization as a resource
See resources: As a user I want to see my saved organizations

## Backlog

Geo location: See organizations in a map
About page
Upload with scroll

## Client/Frontend

## React Router Routes (React App)

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

Home Page (anon/user)
Sign Up Page (anon only)
Log in Page (anon only)
Organizations List Page (anon/user)
Organization Create (user only)
Organization Edit (owner only)
Organization Detail Page (user only)
My Profile Page (user only)
404 Page (user)

### Components

Navbar
UserDetails
OrganizationCards (search and list all)
AddOrganization
AddReview
Search component
Footer
ProfileEditForm

### Services

Auth Service
auth.login(user)
auth.signup(user)
auth.logout()
auth.me()
auth.getUser() // synchronous
Localisation: External Map API
Search Service

## Server

### Models

#### organization model(schema)

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

[Link to your whimsical](https://whimsical.com/BnwoEhQR9ER8CcNtfSE3w7)

### Trello

[Link to your trello](https://trello.com/b/eAbJNkXd/project-3)

### Git

[Link to your git hub repo](https://github.com/monikageiger/project3)

### Deploy Link

[Link to your Heroku]()

### Slides Link

[Link to your Slides]()
