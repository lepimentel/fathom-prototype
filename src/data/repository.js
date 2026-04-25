import { inquiries as mockInquiries } from './mockData.js';

export function getInquiries() {
  return mockInquiries;
}

export function getActiveInquiries() {
  return mockInquiries.filter(isActiveInquiry);
}

export function getInquiryById(id) {
  if (id == null) return null;
  const numericId = typeof id === 'string' ? Number.parseInt(id, 10) : id;
  if (!Number.isFinite(numericId)) return null;
  return mockInquiries.find((i) => i.id === numericId) ?? null;
}

export function isActiveInquiry(inq) {
  return inq?.status === 'investigating' && Array.isArray(inq.processNodes) && inq.processNodes.length > 0;
}

export function isArchivedInquiry(inq) {
  return inq?.status === 'completed';
}
