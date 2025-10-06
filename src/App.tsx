import {PageWrapper} from "./components/PageWrapper";
import {Container} from "./components/Container";
import {Header} from "./components/Header";
import {Search} from "./components/Search";
import {ShortList} from "./components/ShortList";
import {PuppiesList} from "./components/PuppiesList";
import {NewPuppyForm} from "./components/NewPuppyForm";
import {puppies as puppiesData} from "./data/puppies";
import {useState} from "react";
import {type Puppy} from "./types";
import {LikedContext} from "./context/liked-context";

export function App() {
  return (
    <PageWrapper>
      <Container>
        <Header/>
        <Main/>
      </Container>
    </PageWrapper>
  );
}

function Main() {
  const [liked, setLiked] = useState<Puppy['id'][]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [puppies, setPuppies] = useState<Puppy[]>(puppiesData);

  return (
    <main>
      <LikedContext value={{liked, setLiked}}>
        <div className="mt-24 grid gap-8 sm:grid-cols-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          <ShortList puppies={puppies}/>
        </div>
        <PuppiesList searchQuery={searchQuery} puppies={puppies}/>
      </LikedContext>
      <NewPuppyForm puppies={puppies} setPuppies={setPuppies}/>
    </main>
  );
}
