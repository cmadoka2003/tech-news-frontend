import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';

// config redux
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";


import bookmarks from '../reducers/bookmarks';
import user from "../reducers/user"
import { Toaster } from 'react-hot-toast';

// configuration de Redux Persist
const reducers = combineReducers({ bookmarks, user });
const persistConfig = { key: "tech-news-673829HDHEY", storage };

// création du store Redux
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// création du persistor
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  // on enveloppe l'application dans le Provider pour que les composants puisent être enrengister dans le store
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Next.js App</title>
        </Head>
        <Toaster />
        <Header />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
