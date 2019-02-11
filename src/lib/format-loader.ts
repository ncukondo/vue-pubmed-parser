import { firestore as db } from '@/lib/firestore';

export const loadFormat = async (formatId: string): Promise<string> => {
  let format = '';
  try {
    const doc = await db
      .collection('formats')
      .doc(formatId)
      .get();
    const data = doc.data();
    if (doc.exists && data) {
      format = data.format;
    }
  } catch (e) {}
  return format;
};

export const makeUrl = async (formatText: string): Promise<string> => {
  let url = '';
  try {
    const docRef = await db.collection('formats').add({
      format: formatText,
    });

    url = location.origin.replace(/\/$/, '') + '/format/' + docRef.id;
  } catch (e) {}
  return url;
};
