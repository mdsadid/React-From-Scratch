import { PageWrapper } from "./components/PageWrapper";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { ShortList } from "./components/ShortList";
import { PuppiesList } from "./components/PuppiesList";
import { NewPuppyForm } from "./components/NewPuppyForm";
import { Suspense, use, useState } from "react";
import { type Puppy } from "./types";
import { getPuppies } from "./queries";
import { LoaderCircle } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { PuppiesContext } from "./context/puppies-context";

export function App() {
  return (
    <PageWrapper>
      <Container>
        <Header />
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className="mt-12 bg-red-100 p-6 shadow ring ring-black/5">
              <p className="text-red-500">{error.message}</p>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className="mt-12 grid h-48 place-items-center">
                <LoaderCircle className="animate-spin stroke-slate-500" />
              </div>
            }
          >
            <Main />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </PageWrapper>
  );
}

const puppyPromise = getPuppies();

function Main() {
  const apiPuppies = use(puppyPromise);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [puppies, setPuppies] = useState<Puppy[]>(apiPuppies);

  return (
    <main>
      <PuppiesContext value={{ puppies, setPuppies }}>
        <div className="mt-24 grid gap-8 sm:grid-cols-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <ShortList />
        </div>
        <PuppiesList searchQuery={searchQuery} />
        <NewPuppyForm />
      </PuppiesContext>
    </main>
  );
}
