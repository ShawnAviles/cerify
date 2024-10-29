# Cerify

**Gamify Cognitive Activities to Support Brain Health in Patients with Dementia**

Pronunciation: _sehr·rih·fai_

![Static Badge](https://img.shields.io/badge/_Best_use_of_MongoDB_Atlas-darkgreen?label=HackRU%20F2024%20WINNER&labelColor=gold&link=https://devpost.com/software/cerify)

## Overview

Cerify is a mobile app designed to help dementia patients engage in simple, stimulating cognitive activities that support brain health. Inspired by platforms like Duolingo, Cerify offers a fun, game-like experience that exercises various cognitive functions while allowing caregivers to monitor user progress. With an easy-to-use interface, Cerify aims to provide meaningful engagement and cognitive support for individuals experiencing memory loss or focus issues.

### HackRU 2024 Project

**Contributors**
- Christian Apostol
- Shawn Aviles
- Justin Ferber
- Harris Pyo

**Artifacts**
- [DevPost](https://devpost.com/software/cerify)
- [Figma](https://www.figma.com/design/T56JuXsvBhtv34fjYtxCEQ/HackRU-FA24?node-id=14-39&t=jnAKeEB8PoFPzQp3-1)
- [Pitch Deck](https://docs.google.com/presentation/d/1At7aAnCG_i7pHIjARA9nuR0Yx92IS8EFq5l7zhLY-Sw/edit?usp=sharing)

---

## Demo

### Video

https://github.com/user-attachments/assets/513507b4-13e8-4ef8-bcfe-401fd8b5e796

### Some Screens

<img src="/client/demo/Home.png" data-canonical src="/client/demo/Home.png" width="200" /> <img src="/client/demo/MatchMaking.png" data-canonical src="/client/demo/MatchMaking.png" width="200" /> <img src="/client/demo/Whack.png" data-canonical src="/client/demo/Whack.png" width="200" /> <img src="/client/demo/Stats.png" data-canonical src="/client/demo/Stats.png" width="200" />

## Key Features

- **Cognitive Activities** - Cerify provides tailored exercises that encourage users to stay mentally active and improve specific skills. Each activity is designed with simplicity and ease of use in mind:
  - Memory Match: A card-matching game to enhance short-term and visual memory.
  - Attention Games: A “whack-a-mole” style game that improves concentration and reaction time.

- **Progress Tracking & Analytics** - The analytics page tracks user progress, providing insights on performance over time, making it a helpful tool for caregivers and family members.

- **Daily Reminders** - Cerify sends reminders to encourage daily engagement, fostering a consistent routine that benefits cognitive health.

## Built With

- **Frontend**: React Native for cross-platform compatibility
- **Backend**: ExpressJS
- **Database**: MongoDB Atlas

## Getting started

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

Open the app using a [development build](https://docs.expo.dev/develop/development-builds/introduction/), [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/), [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/), or [Expo Go](https://expo.dev/go).

Modify files inside the **app** directory to develop the project further. This project uses [file-based routing](https://docs.expo.dev/router/introduction) for easy navigation setup.

## Challenges & Accomplishments

Creating an app that balances simplicity and cognitive benefit was challenging but rewarding. We’re proud to have developed an accessible UI that meets our users’ unique needs. Additionally, our analytics feature enables caregivers to monitor cognitive progress effectively.

## Future Directions

- **Expanded Cognitive Activities**: Additional games targeting more brain functions, including language skills and executive function.
- **Brain Model Visualization**: A glowing brain model that represents cognitive progress.
- **Machine Learning Customization**: Personalized activity suggestions based on ongoing performance, which is stored and able to be shared with machine learning models.
- **Patient and Caretaker Roles**: User authentication and ability for caretakers to monitor their patients' progress and adjust difficulties.
