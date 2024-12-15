import { useAuth } from "@/services/hooks/useAuth";

export interface CheckResult {
  canEdit: boolean;
  isLoading: boolean;
}

export const useCheckEditPermissions = (userId: number) => {
  const { data, isLoading } = useAuth();

  if (!data) {
    return { canEdit: false, isLoading };
  }

  return { canEdit: data.id === userId, isLoading };
};
