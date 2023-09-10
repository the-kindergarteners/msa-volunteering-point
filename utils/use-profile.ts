'use client'

import { Timestamp, doc } from "firebase/firestore";
import {
  ObservableStatus,
  useFirestore,
  useFirestoreDocData,
} from "./reactfire";
import { z } from "zod";
import { User } from "firebase/auth";

const Gender = z.enum(["male", "female", "null"]);
type Gender = z.infer<typeof Gender>;

const Campus = z.enum(["clayton", "caulfield", "peninsula", "parkville"]);
type Campus = z.infer<typeof Campus>;

const Role = z.enum(["member", "coordinator"]);
type Role = z.infer<typeof Role>;

export const Profile = z.object({
  firstName: z.string(),
  lastName: z.string(),
  id: z.string(),
  phone: z.string(),
  birthdate: z.preprocess((value) => {
    if (value instanceof Timestamp) return value.toDate();
    else if (typeof value === "string") return new Date(value);
    return new Date(value as any);
  }, z.date()),
  gender: Gender,
  campus: Campus,
  home: z.object({
    street: z.string(),
    suburb: z.string(),
    state: z.string(),
    postcode: z.string(),
  }),
  role: Role.default("member"),
});
type Profile = z.infer<typeof Profile>;

export default function useProfile(user: User): ObservableStatus<Profile | null> {
  const firestore = useFirestore();
  const ref = doc(firestore, "users", user.uid);
  const snapshotObservable = useFirestoreDocData(ref);
  const snapshot = snapshotObservable.data;
  if (snapshot == null) return snapshotObservable as ObservableStatus<any>;
  return {
    ...snapshotObservable,
    data: Profile.parse(snapshot)
  }
}
