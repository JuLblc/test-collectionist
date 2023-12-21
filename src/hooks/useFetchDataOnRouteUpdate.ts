import { ref, onMounted, Ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getRouteId } from "../helpers";

type UseFetchDataOnRouteUpdateProps<T> = {
  fetchData: (params: string) => Promise<T>;
};

type UseFetchDataOnRouteUpdateResult<T> = {
  fetchedData: Ref<T | null>;
  isLoading: Ref<boolean>;
  isError: Ref<boolean>;
};

const useFetchDataOnRouteUpdate = <T>({
  fetchData,
}: UseFetchDataOnRouteUpdateProps<T>): UseFetchDataOnRouteUpdateResult<T> => {
  const route = useRoute();

  const fetchedData = ref<T | null>(null);
  const isLoading = ref(false);
  const isError = ref(false);

  const fetchDataAsync = async (params: string) => {
    try {
      isLoading.value = true;

      const response = await fetchData(params);

      // @ts-expect-error
      fetchedData.value = response;
    } catch (error) {
      isError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    const id = getRouteId(route);
    id && fetchDataAsync(id);
  });

  watch(route, () => {
    const id = getRouteId(route);
    id && fetchDataAsync(id);
  });

  // @ts-expect-error
  return { fetchedData, isLoading, isError };
};

export default useFetchDataOnRouteUpdate;
