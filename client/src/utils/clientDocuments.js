// import { fileUrl } from "./fileUrl"

export const documenetsPendingCheck = client => {
  var approvedDocumentsNumber = 0, pendingDocumentsNumber = 0
  if (client.creditDebitCardFrontStatus === 'Approved') approvedDocumentsNumber++
  if (client.creditDebitCardBackStatus === 'Approved') approvedDocumentsNumber++

  pendingDocumentsNumber = 2 - approvedDocumentsNumber

  if (pendingDocumentsNumber === 0) return 'All Documents Approved'
  else return `${pendingDocumentsNumber} Documents Are Pending`
}

export const getDocumentList = client => {
  var documents = []
  documents.push({ 
    name: 'Credit Debit Card Front', 
    path: client['frontCardLink'], 
    keyInDB: 'frontCardLink',
    status: client.frontCardLinkStatus,
  })
  documents.push({ 
    name: 'Credit Debit Card Back', 
    path: client['backCardLink'], 
    keyInDB: 'backCardLink',
    status: client.backCardLinkStatus,
  })

  return documents
}