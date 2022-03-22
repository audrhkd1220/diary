import { collection, setDoc, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";


//web-diary컬렉션에 test문서에 필드저장
/*
const addData = async () => {
  try {
    const res = await setDoc(doc(db, "web-diary", "test"), test);
    console.log(res); // res는 undefined입니다.
  } catch (e) {
    console.log(e);
  }
};

const getData = async () => {
  const docRef = doc(db, 'web-diary', 'test');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

const updateData = async () => {
  await updateDoc(washingtonRef, {
    'aaa@gmail.com': arrayUnion(test)
  });
}

const citiesRef = collection(db, "cities");
*/


//db활용 진짜 부분
export const addDiary = async (user, diaryList) => {
  const docRef = doc(db, "web-diary", user);
  await setDoc(docRef, { regions: diaryList });
}

export const getDiary = async (user) => {
  const docRef = doc(db, "web-diary", user);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } 
  return [];
}