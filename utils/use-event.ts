import { doc } from "firebase/firestore";
import { ObservableStatus, useFirestore, useFirestoreDocData } from "./reactfire";

export interface Event {
  id: string;
  name: string;
  date: Date;
  recruiting: boolean;
}

export interface AvailableEvent extends Event {
  recruiting: true;
  jobsLeft: number;
}

export interface UnavailableEvent extends Event {
  recruiting: false;
  awaiting: number;
}

export default function useEvent(
  id: string
): ObservableStatus<AvailableEvent | UnavailableEvent> {
  const firestore = useFirestore();
  const ref = doc(firestore, "events", id);
  const snapshotObservable = useFirestoreDocData(ref, { idField: "id" });
  const snapshot = snapshotObservable.data;
  if (snapshot != null)
    return {
      ...snapshotObservable,
      data: (() => {
        const event = snapshot
        const participantsDiff = event["jobs"] - event["participants"].length;
        return {
          id: event["id"],
          name: event["name"],
          date: event["date"].toDate(),
          ...(participantsDiff > 0
            ? {
                recruiting: true,
                jobsLeft: participantsDiff,
              }
            : {
                recruiting: false,
                awaiting: -participantsDiff,
              }),
        };
      })(),
    };
  return snapshotObservable as ObservableStatus<any>;
}
