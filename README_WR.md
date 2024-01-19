# Full stack Javascript/Typescript hiring test
## Description
Create an application composed by two parts (front-end and back-end) with a structure similar to WeRoad.  
This application should manage CRUD operation for travel and tours and simulate a backoffice workflow.

## Glossary
- Travel is the basic, fundamental unit of WeRoad: it contains all the necessary information, like the number of days, the images, title, what's included and everything about its appearance. An example is Jordan 360° or Iceland: hunting for the Northern Lights;
- Tour is a specific dates-range of travel with its own price and details. Jordan 360° may have a tour from 20 to 27 January at €899, another one from 10 to 15 March at €1099 etc. At the end, in WeRoad, you will book a tour, not a travel.

## Goals

#### The back-end project should have:

1. A login endpoint to retrieve the user roles; [x]
2. A private (admin) endpoint to create new users. If you want, this could be a DB seeder. This will mainly be used to generate users for this exercise; [x]
3. A private (admin) endpoint to create new travels; [x]
4. A private (admin) endpoint to create new tours for travel; [x]
5. A private (admin) endpoint to delete a travel; [x]
6. A public (no auth) endpoint to get a list of paginated travels and associated tours. It must return only `public` travels; 
7. (optional) A private (editor) endpoint to update a tour; [x]
8. (optional) A public (no auth) endpoint to get a list of paginated tours by the travel `slug` (e.g. all the tours of the travel `foo-bar`). Users can filter (search) the results by `priceFrom`, `priceTo`, `startingDate`, `endingDate`. User can sort the list by `price` asc and desc. They will **always** be sorted, after every additional user-provided filter, by `startingDate` asc.

#### The front-end project should have:
1. A page that allows to interact with the travel end-points described above [x]
3. Roles should be considered in the user interaction within the pages (e.g only admins can delete travel) [x]
4. A page that lists the paginated travels and links to the single travel [x]
5. (optional) A page that lists the paginated tours and links to the single tour [x]
6. (optional) A page that allows to interact with the tour end-points described above [x]

## What we would like to see?
- NestJs and idiomatic syntax (back-end) OK  
- VueJs (or Nuxt), Vuex (front-end) OK
- Automated tests (back-end) OK
- GraphQL endpoints (back-end) OK
- Usage of ORM  (back-end)  OK
- Good project setup with linter/formatter (front-end/back-end) OK

## Notes
- You should provide instructions on how to set up and start the project in local environment 
- You are free to organize the project as you prefer, a good project organization is appreciated OK
- For the front-end part feel free to use the libraries and component libraries you are most proficient with
- We use UUIDs as primary keys instead of incremental IDs, but it's not required for you to use them, although highly appreciated;
- **Tours prices** are integer multiplied by 100: for example, €999 euro will be `99900`, but, when returned to Frontends, they will be formatted (`99900 / 100`); OK
- **Tours names** inside the `samples` are a kind-of what we use internally, but you can use whatever you want; OK
- Every `admin` user will also have the `editor` permissions; OK
- In the `samples` folder you can find JSON files containing fake data to get started with;
- Feel free to add to the project whatever you want!

## Models

**Users**

- ID
- Email (unique)
- Password
- Roles (*Many-to-Many relationship*)

**Roles**

- ID
- Name

**Travels**

- ID
- Is Public (bool)
- Slug
- Name (unique)
- Description
- Number of days
- Number of nights (virtual, computed by `numberOfDays - 1`)
- Moods (see the samples to learn more)

**Tours**

- ID
- Travel ID (*Many-to-One relationship*)
- Name (unique)
- Starting date
- Ending date
- Price (integer, see above)
