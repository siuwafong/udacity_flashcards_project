# Flashcards Project

This is the third project from Udacity's React Nanodegree program. It is a simple flashcard program that allows users to create their own decks and flashcards with text-based questions and answers. After creating your decks and cards, you can run a quiz where you can go through the cards for a chosen deck. The quiz will first show you the question part of the card and then you can click on the "Show Answer" button to view the answer. The app will record your score at the end of each quiz.

# Libraries/Frameworks

This mobile app was created with create-react-native-app. React Navigation 4.x was used instead of the current 5.x version. React-Native-Picker-Select is a library used for dropdown menus. AsyncStorage is used for storing data locally. The app was tested on Expo for Android.

# Instructions

* install all project dependencies with `npm install`
* Start the development server with `expo start`
* Sometimes starting the app will result in a "Exception in native call from JS" error. The app will work as normal after dismissing this error message

## How to Use

* The app opens with the decks screen.  Click on the "Add a Deck" button to create your first deck.
* After creating your deck you can add cards by clicking on "Add Cards" in the deck screen. You can type in questions and answers for your cards.
* You can edit your decks by selecting the deck and then pressing "Edit Deck". This will allow you to change the title and delete/edit cards.
