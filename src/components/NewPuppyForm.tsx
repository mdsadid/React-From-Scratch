import { useFormStatus } from "react-dom";
import { usePuppies } from "../context/puppies-context";
import { createPuppy } from "../queries";
import { ErrorBoundary } from "react-error-boundary";

export function NewPuppyForm() {
  const { puppies, setPuppies } = usePuppies();

  return (
    <div className="mt-12 flex flex-col items-center justify-between bg-white p-4 shadow ring ring-black/5 sm:p-6 md:p-8">
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <>
            {(error as any).errors && (
              <>
                <p className="mb-2 font-semibold text-red-700">
                  Validation Errors
                </p>
                <ul className="list-inside list-decimal space-y-1">
                  {Object.entries((error as any).errors).map(
                    ([field, messages]) => (
                      <li key={field} className="text-red-600">
                        {(messages as string[]).join(", ")}
                      </li>
                    ),
                  )}
                </ul>
              </>
            )}
          </>
        )}
      >
        <form
          action={async (formData: FormData) => {
            const newPuppy = await createPuppy(formData);

            setPuppies([...puppies, newPuppy]);
          }}
          className="mt-4 flex w-full flex-col items-start gap-6"
        >
          <div className="grid w-full gap-6 md:grid-cols-2">
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                className="w-full rounded-md bg-white px-3 py-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="name"
                type="text"
                name="name"
                required
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1">
              <label htmlFor="trait">Personality Trait</label>
              <input
                className="w-full rounded-md bg-white px-3 py-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="trait"
                type="text"
                name="trait"
                required
              />
            </fieldset>
            <fieldset className="flex flex-col gap-1 md:col-span-2">
              <label htmlFor="image_url">Profile Picture</label>
              <input
                className="w-full cursor-pointer rounded-md bg-white px-3 py-2 ring-1 ring-gray-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="image_url"
                type="file"
                name="image_url"
              />
            </fieldset>
          </div>
          <SubmitButton />
        </form>
      </ErrorBoundary>
    </div>
  );
}

function SubmitButton() {
  const status = useFormStatus();

  return (
    <button
      className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:cursor-pointer hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-200"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? `Adding ${status?.data?.get("name")}...` : "Add Puppy"}
    </button>
  );
}
