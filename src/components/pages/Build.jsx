import "../../styling/Build.css";

function Build() {
  return (
    <div className="content-container">
      <h1>Behind the Scenes</h1>
      <div className="glassmorphism-container">
        <main className="build-parent">
          <div className="build-sect-1">
            <img src="/pixel-AM.png" alt="dev" />
            <img src="/pixel-AT.png" alt="dev" />
            <img src="/pixel-SW.png" alt="dev" />
            <img src="/pixel-NP.png" alt="dev" />
          </div>
          <div className="build-sect-2">Fun Facts</div>
          <div className="build-sect-3">Tech-stack</div>
        </main>
      </div>
    </div>
  );
}
export default Build;
