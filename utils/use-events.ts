import { collection } from "firebase/firestore";
import { ObservableStatus, useFirestore, useFirestoreCollectionData } from "./reactfire";
import { AvailableEvent, UnavailableEvent } from "./use-event";

export default function useEvents(): ObservableStatus<Array<AvailableEvent | UnavailableEvent>> {
    const firestore = useFirestore()
    const ref = collection(firestore, 'events')
    const snapshotObservable = useFirestoreCollectionData(ref, {idField: 'id'})
    const snapshot = snapshotObservable.data;
    if (snapshot != null) return {
        ...snapshotObservable,
        data: snapshot.map(event => {
            const participantsDiff =
              event["jobs"] - event["participants"].length;
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
        })
    }
    return snapshotObservable as ObservableStatus<any>
}