import Card from "./components/Card";

export default function Home() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-8xl font-bold">Point Quest</h1>
            <h3 className="text-2xl py-5 font-semibold">
              Engage, Track, Earn !
            </h3>
            <p className="py-6">
              Stay updated on all club activities in one place. Easily manage
              events and track updates on any device.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <Card />
    </>
  );
}
