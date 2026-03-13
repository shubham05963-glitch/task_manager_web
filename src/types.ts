export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photoURL?: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  color: string;
  dueDate: string; // ISO string
  status: 'incomplete' | 'completed';
  createdAt: string; // ISO string
}

export type OperationType = 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}
