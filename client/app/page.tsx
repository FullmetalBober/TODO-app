import CreateTask from '@/components/Form/CreateTask';
import Tasks from '@/components/Task/Tasks';
import Filter from '@/components/Util/Filter';
import Search from '@/components/Util/Search';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between md:p-24 max-w-5xl mx-auto gap-3'>
      <section className='grid grid-cols-2 items-center gap-2 w-full'>
        <CreateTask />
        <Search />
      </section>
      <Filter />
      <Tasks />
    </main>
  );
}
