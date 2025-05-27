import "../../styling/Build.css";

function Build() {
  return (
    <div className="content-container">
      <h1>Behind the Scenes</h1>
      <div className="glassmorphism-container">
        <main className="build-parent">
          <div className="build-sect-1">
            <img src="/techStack.png" alt="tech stack F1 car" />
          </div>
          <div className="build-sect-2"></div>
          <div className="build-sect-3">
            <div className="dev-container">
              <div className="build-div1">
                <span class="material-symbols-outlined">bolt</span>
                <div className="dev-icon-divider"></div>
                <div>
                  <p>Alyssa</p> <h2>Mitchell</h2>
                </div>
              </div>
              <div className="build-div2">
                <small>Commits</small>
                <p>XXXX</p>
              </div>
              <div className="build-div3">
                <img src="/pixel-AM.png" alt="dev" />
              </div>
            </div>
            <div className="dev-container">
              <div className="build-div1">
                <span class="material-symbols-outlined">local_cafe</span>
                <div className="dev-icon-divider"></div>
                <div>
                  <p>Adrian</p> <h2>Tandiono</h2>
                </div>
              </div>
              <div className="build-div2">
                <small>Commits</small>
                <p>XXXX</p>
              </div>
              <div className="build-div3">
                <img src="/pixel-AT.png" alt="dev" />
              </div>
            </div>
            <div className="dev-container">
              <div className="build-div1">
                <span class="material-symbols-outlined">star</span>
                <div className="dev-icon-divider"></div>
                <div>
                  <p>Shaniqua</p> <h2>Whitley</h2>
                </div>
              </div>
              <div className="build-div2">
                <small>Commits</small>
                <p>XXXX</p>
              </div>
              <div className="build-div3">
                <img src="/pixel-SW.png" alt="dev" />
              </div>
            </div>
            <div className="dev-container">
              <div className="build-div1">
                <span class="material-symbols-outlined">laptop_mac</span>
                <div className="dev-icon-divider"></div>
                <div>
                  <p>Nikhil</p> <h2>Patel</h2>
                </div>
              </div>
              <div className="build-div2">
                <small>Commits</small>
                <p>XXXX</p>
              </div>
              <div className="build-div3">
                <img src="/pixel-NP.png" alt="dev" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Build;
