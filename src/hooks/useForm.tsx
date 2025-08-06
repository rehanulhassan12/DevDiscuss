
import { useReducer, useState, ChangeEvent } from "react";
type FormState = Record<string, any>;
export default function useForm<T extends FormState>(initialState: T) {

  const [state, setState] = useReducer(

    (state: T, action: Partial<T>) => ({ ...state, ...action }),
    initialState
  )

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Record<string, string> | null>({});
  const [submitted, setSubmitted] = useState(false);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setState({ [name]: value } as Partial<T>);

  }
  const onEditorChange = (name: string, value?: string) => {
    setState({ [name]: value || '' } as Partial<T>);
  };
  const onFileChange = (name: string, file: File | null) => {
    setState({ [name]: file } as Partial<T>);
  };




  return {
    state,
    onValueChange,
    isLoading,
    setIsLoading,
    error,
    setError,
    submitted,
    setSubmitted,
    onEditorChange,
    onFileChange
  }

}
