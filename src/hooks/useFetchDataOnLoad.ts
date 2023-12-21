import { ref, onMounted, Ref } from "vue";

type UseFetchDataOnLoadProps<T> = {
  fetchData: () => Promise<T>;
};

type UseFetchDataOnLoadResult<T> = {
  fetchedData: Ref<T | null>;
  isLoading: Ref<boolean>;
  isError: Ref<boolean>;
};

const useFetchDataOnLoad = <T>({
  fetchData,
}: UseFetchDataOnLoadProps<T>): UseFetchDataOnLoadResult<T> => {
  const fetchedData = ref<T | null>(null);
  const isLoading = ref(false);
  const isError = ref(false);

  const fetchDataAsync = async () => {
    try {
      isLoading.value = true;

      const response = await fetchData();

      // @ts-expect-error
      fetchedData.value = response;
    } catch (error) {
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => fetchDataAsync());

  // @ts-expect-error
  return { fetchedData, isLoading, isError };
};

export default useFetchDataOnLoad;
