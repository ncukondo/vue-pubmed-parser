import { firestore as db } from '@/lib/firestore';

const SHORT_FORMAT =
  '${journal_short}. ${year};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? " pmid:" + pmid : ""}.';
const LONG_FORMAT =
  // tslint:disable-next-line:max-line-length
  '${ total>1 ? index+") ":""}${makeAuthorList(" ,",6)}. ${title}. ${journal}. <i>${year}</i>${month ? " "+ month : ""};${vol}${ issue ? "("+issue+")" : ""}:${page}${ pmid ? \' <i><a href="https://www.ncbi.nlm.nih.gov/pubmed/\'+pmid+\'">pmid:\'+pmid +"</a></i>" : ""}.';

export const DEFAULT_FORMAT = `:title:Short
${SHORT_FORMAT}

:title:Long
${LONG_FORMAT}

:pagetitle:Pubmed2Citation
`;
let formatForURL = DEFAULT_FORMAT;

export const getFormatForUrl = () => {
  return formatForURL;
};

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
      formatForURL = format;
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
