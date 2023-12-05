<a name="readme-top"></a>
<div style="text-align:center">
    <img src="https://i.pinimg.com/564x/73/af/24/73af241dcddb2313f9e2a032236f4bab.jpg" alt="Alt Text">
</div>

<div align="center">
  <h1 align="center">S - Manage</h1>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>

<a name="about-the-project"></a>
<!-- ABOUT THE PROJECT -->
## About The Project
Welcome to the **S-Manage** system! This project is a collaborative effort aimed at creating an efficient and comprehensive solution for managing activities related to a S club.

Features:
- User Management: Easily add, update, and delete user profiles within the system. Track essential user information, such as name, age, gender, contact details, and more.
- Bill and Payment Management: Keep track of bills, payments, and financial transactions seamlessly. The system allows you to record details of bills, payments, and even manage bill payments associated with specific users.
- Role-Based Access Control: Define roles and permissions to control access within the application. Ensure that each user has the right level of access based on their responsibilities.
- Refund Management: Manage refunds for payments, providing transparency and accountability in financial transactions.
- Intuitive Dashboard: Get a visual overview of key metrics and activities through a user-friendly dashboard. Monitor the health and performance of your S club effortlessly.



<p align="right">(<a href="#readme-top">back to top</a>)</p>


<a name="built-with"></a>
### Built With
* [![ExpressJs][expressjs.com]][ExpressJs-url]
* [![Vue][Vue.js]][Vue-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
<a name="getting-started"></a>
## Getting Started
These instructions will help you get a copy of the project up and running on your local machine.

<a name="prerequisites"></a>
### Prerequisites

#### Backend
Before you begin, ensure you have met the following requirements:

- [Express](https://expressjs.com/)
- [Stripe](https://stripe.com/fr-us)
- [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/)

#### Frontend

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and [YARN](https://yarnpkg.com/) installed
- [Vue.js](https://vuejs.org/) version 3.3.8
- [Nuxt.js](https://nuxtjs.org/) version 3.8.1
- [axios](https://axios-http.com/) version 1.5.1
- [tailwindcss](https://tailwindcss.com/) version 3.3.5

<a name="installation"></a>


### Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/CaoTuanKiett/S_Manage.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd S_Manage_BE
    ```

3. Install backend dependencies:

    ```bash
    npm install
    ```

4. Copy the `.env.example` file:

    ```bash
    cp .env.example .env
    ```

5. Migrate the database:

    ```bash
    npx knex migrate:latest
    ```

6. Seed the database:

    ```bash
    npx knex seed:run
    ```

7. Run the backend server:

    ```bash
    npm start
    ```

8. Open a new terminal window, navigate to the frontend directory:

    ```bash
    cd ../S_Manage_FE
    ```

9. Install frontend dependencies:

    ```bash
    yarn install
    ```

10. Copy the `.env.example` file:

    ```bash
    cp .env.example .env
    ```

11. Run the Nuxt development server:

    ```bash
    yarn dev
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
<a name="contributing"></a>
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[NodeJs]: ".."
[ExpressJs-url]: https://expressjs.com/