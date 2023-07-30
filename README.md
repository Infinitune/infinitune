<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/infinitune/infinitune">
    <img src="https://i.imgur.com/GqmGIFs.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Infinitune</h3>

  <p align="center">
    Synthesize any audio forever
    <br />
    <a href="https://github.com/infinitune/infinitune"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://infinitune.org">View Live Site</a>
    ·
    <a href="https://app.decktopus.com/share/UpbbwnDaE">View Presentation</a>
    ·
    <a href="https://github.com/presolve-xyz/presolve/issues">Report Bug</a>
    ·
    <a href="https://github.com/presolve-xyz/presolve/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/infinitune/infinitune.git
    ```
2. Install NPM packages

    ```sh
    npm install
    ```

3. Run

    ```bash
    npm run dev
    #or
    yarn dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Infinitune Screen Shot][product-screenshot]](https://i.imgur.com/lkUPln0.png)

## Inspiration

Our team is a diverse group with a shared passion for technology and music. The concept for Infinitune was born out of a desire to bridge the gap between music, coding & generative AI. Our vision was to create a tool that would allow users to generate unique music samples using simple text inputs, thus opening up a new world of possibilities for creativity and expression.

## Updates

USING TONE.JS INSTEAD OF SUPERCOLLIDER:
Currently, the backend API can receive POST and GET, a POST containing a prompt and a instrument type is extracted and sent to GPT-4, which generates Tone.js code for that sound. This is saved, and the ID is passed back as the response for the POST. A GET with this ID returns a blob containing the javascript code. The frontend is not connected to this backend yet (07/19/23).

## What it does

Infinitune is an innovative tool that brings a unique text-to-code-to-audio approach to music sample generation. Users enter a textual description, and Infinitune translates this into executable SuperCollider code, which in turn synthesizes into the desired music sample. This could be anything from drum beats to basslines to melodies.

## How we built it

Infinitune was built using a robust stack that includes Node.js, Express.js, ngrok, Next.js, React, Tone.js, GPT-4, and SuperCollider. Our main tool was the OpenAI GPT-4 model, which we used to convert the user's text into SuperCollider code. The server was implemented using Node.js, Express.js, and ngrok, which handled the API calls between the frontend (developed with Next.js) and the backend where the AI model was running.

## Challenges we ran into

We first attempted to fine-tune the GPT-4 model to directly generate music samples, but this approach didn't yield the desired results. We pivoted to querying GPT-4 with examples of music samples we liked, which then guided the creation of new samples. Another challenge was the unexpected departure of a team member on the final day of the hackathon. However, we were able to adapt and take on additional responsibilities.

## What we learned

Our journey in creating Infinitune has been a whirlwind of learning and growth. We discovered the nuances of working with AI, particularly the GPT-4 model, and its potential applications in music production. We explored the fascinating intersection of music and coding, experimenting with the potential of a text-to-code-to-audio approach. Furthermore, the experience highlighted the power of adaptability and resilience.

## What's next for Infinitune

The potential of Infinitune extends far beyond the realm of sample or music production. With its ability to convert textual descriptions into unique audio samples, Infinitune has a vast array of applications across multiple industries. From enhancing live streams with on-the-fly event/alert sounds to scoring scenes for movies, from generating dynamic sound effects for video games to customizing audio for podcasts, content creation, and comedy routines, the possibilities are endless. Furthermore, it can be used for audio branding, allowing businesses to create custom jingles that align with their brand identity. It can even contribute to immersive user experiences in AR/VR applications, art installations, and exhibitions. As we advance, we aim to continue refining and expanding Infinitune's capabilities to tap into these exciting opportunities.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/infinitune/infinitune](https://github.com/infinitune/infinitune)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/presolve-xyz/presolve.svg?style=for-the-badge
[contributors-url]: https://github.com/presolve-xyz/presolve/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/presolve-xyz/presolve.svg?style=for-the-badge
[forks-url]: https://github.com/presolve-xyz/presolve/network/members
[stars-shield]: https://img.shields.io/github/stars/presolve-xyz/presolve.svg?style=for-the-badge
[stars-url]: https://github.com/presolve-xyz/presolve/stargazers
[issues-shield]: https://img.shields.io/github/issues/presolve-xyz/presolve.svg?style=for-the-badge
[issues-url]: https://github.com/presolve-xyz/presolve/issues
[license-shield]: https://img.shields.io/github/license/presolve-xyz/presolve.svg?style=for-the-badge
[license-url]: https://github.com/presolve-xyz/presolve/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[product-screenshot]: https://i.imgur.com/lkUPln0.png
