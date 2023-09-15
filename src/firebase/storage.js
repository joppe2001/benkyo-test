// a storage manitpulation file and function for firebase storage

import { storage } from 'firebase/storage';

// Uploads a file to the Firebase storage

export const uploadFile = (file, path) => {
  const storageRef = storage.ref(path);
  return storageRef.put(file);
};

// Deletes a file from the Firebase storage

export const deleteFile = (path) => {
  const storageRef = storage.ref(path);
  return storageRef.delete();
};

// Downloads a file from the Firebase storage

export const downloadFile = (path) => {
  const storageRef = storage.ref(path);
  return storageRef.getDownloadURL();
};

// Gets the metadata of a file from the Firebase storage

export const getMetadata = (path) => {
  const storageRef = storage.ref(path);
  return storageRef.getMetadata();
};

// Gets the list of files from the Firebase storage

export const getFiles = (path) => {
  const storageRef = storage.ref(path);
  return storageRef.listAll();
};

// Gets the list of files from the Firebase storage

export const getFile = (path) => {
  const storageRef = storage.ref(path);
  return storageRef.getDownloadURL();
};

// Gets the list of files from the Firebase storage

export const getFolder = (path) => {
  const storageRef = storage.ref(path);
  return storageRef.listAll();
};

// Gets the list of files from the Firebase storage

export const getFolders = (path) => {
  const storageRef = storage.ref(path);
  return storageRef.listAll();
};