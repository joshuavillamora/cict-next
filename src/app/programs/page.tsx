import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import programsData from '../data/programs.json';

interface Program {
  id: string;
  code: string;
  name: string;
  href: string;
  logo: string;
}

const PROGRAMS: Program[] = programsData as Program[];

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row h-148">
        <div className="relative w-180 md:w-1/2 h-full">
          <Image
            src="/program_assets/cict.png"
            alt="WVSU CICT Building"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="w-180 md:w-1/2 bg-orange-light flex flex-col justify-center p-20 text-white">
          <h1 className="text-5xl font-medium font-major mb-6">Programs and Curriculum</h1>
          <p className="max-w-md text-base font-light font-minor leading-relaxed tracking-tight">
            Explore our undergraduate and graduate degree programs and take the next step toward your goals.
          </p>
        </div>
      </section>
      {/* Courses Offered Section */}
      <section className="max-w-6xl mx-auto pt-27 px-6">
        <h2 className="text-6xl font-medium text-center mb-16 pb-15 font-oswald tracking-tighter">
          Courses Offered
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-22 pb-42">
          {PROGRAMS.map((program: Program) => (
            <Link
              key={program.id}
              href={program.href}
              className="group relative bg-white border border-gray-100 rounded-lg p-8 pt-12 flex flex-col items-center text-center cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Floating Icon Circle */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white border-4 border-orange-light flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-orange-500">
                <div className="w-50 h-50 rounded-full flex items-center justify-center p-2">
                  <Image
                    src={program.logo}
                    alt={`${program.code} logo`}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-3xl font-medium font-oswald tracking-tighter pt-10 mb-2">{program.code}</h3>
              <p className="px-10 text-base font-inter font-normal mb-14 leading-tight tracking-tight h-10">
                {program.name}
              </p>
              <div className="text-black group-hover:text-orange-500 transition-colors transform group-hover:translate-x-1">
                <MoveRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}