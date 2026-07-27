import { useEffect, useState } from "react";
import "./index.css";

const projects = [
  {
    id: "p1",
    name: "Visual Stimulus Study",
    description: "Behavioral response recordings under visual stimuli.",
    experiments: ["Visual Stimulus Response", "Baseline Control"],
    runs: 18,
    recordings: 42,
  },
  {
    id: "p2",
    name: "Cell Imaging Protocol",
    description: "Microscopy recordings for cell morphology analysis.",
    experiments: ["Cell Morphology Imaging"],
    runs: 9,
    recordings: 21,
  },
  {
    id: "p3",
    name: "Control Group Validation",
    description: "Control experiments for imaging validation.",
    experiments: ["Control Validation"],
    runs: 6,
    recordings: 12,
  },
];

const protocols = [
  {
    id: "protocol-1",
    name: "Visual Stimulus Recording",
    version: "v1.2",
    status: "Published",
    used: 18,
  },
  {
    id: "protocol-2",
    name: "Cell Imaging Procedure",
    version: "v2.0",
    status: "Published",
    used: 14,
  },
  {
    id: "protocol-3",
    name: "Sample Preparation",
    version: "v3.1",
    status: "Draft",
    used: 7,
  },
];

const initialRecordings = [
  {
    id: "RUN-2026-071",
    project: "Visual Stimulus Study",
    experiment: "Visual Stimulus Response",
    protocol: "Visual Stimulus Recording v1.2",
    operator: "Carrie Tan",
    date: "Jul 27, 2026",
    duration: "12:34",
    status: "Needs annotation",
  },
  {
    id: "RUN-2026-070",
    project: "Cell Imaging Protocol",
    experiment: "Cell Morphology Imaging",
    protocol: "Cell Imaging Procedure v2.0",
    operator: "Maya Chen",
    date: "Jul 26, 2026",
    duration: "08:17",
    status: "Completed",
  },
  {
    id: "RUN-2026-069",
    project: "Visual Stimulus Study",
    experiment: "Baseline Control",
    protocol: "Visual Stimulus Recording v1.2",
    operator: "Carrie Tan",
    date: "Jul 25, 2026",
    duration: "15:02",
    status: "Completed",
  },
];

function App() {
  const [page, setPage] = useState("Projects");
  const [recordings, setRecordings] = useState(initialRecordings);
  const [showWizard, setShowWizard] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  function startRecording() {
    setPage("Recordings");
    setShowWizard(true);
  }

  function openProject(project) {
    setSelectedProject(project);
    setPage("Project");
  }

  function saveRecording(recording) {
    setRecordings((current) => [recording, ...current]);
    setShowWizard(false);
    setPage("Recordings");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">L</div>
          <div>
            <strong>LabRecord</strong>
            <span>Research workspace</span>
          </div>
        </div>

        <div className="navigation-label">WORKSPACE</div>

        <nav>
          {["Projects", "Recordings", "Protocols", "Datasets"].map((item) => (
            <button
              key={item}
              className={`nav-item ${
                page === item || (page === "Project" && item === "Projects")
                  ? "active"
                  : ""
              }`}
              onClick={() => setPage(item)}
            >
              <span className="nav-symbol">
                {item === "Projects"
                  ? "□"
                  : item === "Recordings"
                  ? "▶"
                  : item === "Protocols"
                  ? "☷"
                  : "▧"}
              </span>
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <strong>Recording workflow</strong>
          <span>
            Every recording is linked to a project, experiment, run, and protocol
            version.
          </span>
        </div>

        <div className="user-area">
          <div className="avatar">CT</div>
          <div>
            <strong>Carrie Tan</strong>
            <span>Researcher</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span className="location">
            Workspace <b>/</b> {page === "Project" ? selectedProject.name : page}
          </span>
          <button className="primary-button" onClick={startRecording}>
            + Start recording
          </button>
        </header>

        {page === "Projects" && (
          <ProjectsPage
            projects={projects}
            openProject={openProject}
            startRecording={startRecording}
          />
        )}

        {page === "Project" && (
          <ProjectPage
            project={selectedProject}
            back={() => setPage("Projects")}
            startRecording={startRecording}
          />
        )}

        {page === "Recordings" && (
          <RecordingsPage
            recordings={recordings}
            startRecording={startRecording}
          />
        )}

        {page === "Protocols" && <ProtocolsPage />}

        {page === "Datasets" && <DatasetsPage projects={projects} />}

        {showWizard && (
          <RecordingWizard
            close={() => setShowWizard(false)}
            saveRecording={saveRecording}
          />
        )}
      </main>
    </div>
  );
}

function ProjectsPage({ projects, openProject, startRecording }) {
  return (
    <Page>
      <PageHeading
        eyebrow="WORKSPACE"
        title="Projects"
        description="Organize experiments, runs, recordings, and datasets."
        action={
          <button className="primary-button" onClick={startRecording}>
            + Start recording
          </button>
        }
      />

      <div className="simple-intro">
        <strong>Projects are the source of truth for your research.</strong>
        <span>
          Each project contains experiments. Each experiment contains runs and
          recordings.
        </span>
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <button
            className="project-item"
            key={project.id}
            onClick={() => openProject(project)}
          >
            <div className="project-letter">{project.name.charAt(0)}</div>
            <div className="project-main">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <div className="project-counts">
                {project.experiments.length} experiments
                <span>·</span>
                {project.runs} runs
                <span>·</span>
                {project.recordings} recordings
              </div>
            </div>
            <span className="row-arrow">→</span>
          </button>
        ))}
      </div>
    </Page>
  );
}

function ProjectPage({ project, back, startRecording }) {
  return (
    <Page>
      <button className="back-link" onClick={back}>
        ← Back to projects
      </button>

      <PageHeading
        eyebrow="PROJECT"
        title={project.name}
        description={project.description}
        action={
          <button className="primary-button" onClick={startRecording}>
            + Start recording
          </button>
        }
      />

      <div className="simple-tabs">
        <button className="selected">Experiments</button>
        <button>Runs</button>
        <button>Recordings</button>
        <button>Protocols</button>
        <button>Datasets</button>
      </div>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <h2>Experiments</h2>
            <p>Repeatable experimental designs within this project.</p>
          </div>
          <button className="secondary-button">+ New experiment</button>
        </div>

        <div className="experiment-list">
          {project.experiments.map((experiment, index) => (
            <div className="experiment-item" key={experiment}>
              <div className="experiment-number">0{index + 1}</div>
              <div>
                <strong>{experiment}</strong>
                <span>
                  {index + 4} runs · Associated protocol available
                </span>
              </div>
              <button className="text-button">View runs →</button>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}

function RecordingsPage({ recordings, startRecording }) {
  const [query, setQuery] = useState("");

  const filtered = recordings.filter((recording) =>
    Object.values(recording)
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <Page>
      <PageHeading
        eyebrow="MEDIA LIBRARY"
        title="Recordings"
        description="Start, review, and retrieve experiment recordings."
        action={
          <button className="primary-button" onClick={startRecording}>
            + Start recording
          </button>
        }
      />

      <div className="recording-explanation">
        <strong>Recordings are linked to runs.</strong>
        <span>
          Use the search field to find videos by project, experiment, run ID,
          protocol, or operator.
        </span>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search recordings..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button className="secondary-button">All projects</button>
        <button className="secondary-button">All statuses</button>
      </div>

      <section className="content-section table-section">
        <table>
          <thead>
            <tr>
              <th>Run ID</th>
              <th>Project / experiment</th>
              <th>Protocol used</th>
              <th>Operator</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((recording) => (
              <tr key={recording.id}>
                <td>
                  <strong className="run-id">{recording.id}</strong>
                  <span className="muted">{recording.duration}</span>
                </td>
                <td>
                  <strong>{recording.project}</strong>
                  <span className="muted">{recording.experiment}</span>
                </td>
                <td>{recording.protocol}</td>
                <td>{recording.operator}</td>
                <td>{recording.date}</td>
                <td>
                  <span
                    className={`status ${
                      recording.status === "Completed" ? "completed" : "review"
                    }`}
                  >
                    {recording.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="empty-state">No recordings match your search.</div>
        )}
      </section>
    </Page>
  );
}

function ProtocolsPage() {
  const [query, setQuery] = useState("");

  const filtered = protocols.filter((protocol) =>
    `${protocol.name} ${protocol.version}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <Page>
      <PageHeading
        eyebrow="REUSABLE KNOWLEDGE"
        title="Protocols"
        description="Reusable, versioned procedures that can be attached to many runs."
        action={<button className="primary-button">+ Upload protocol</button>}
      />

      <div className="recording-explanation">
        <strong>Protocols are reusable templates.</strong>
        <span>
          A run stores the exact protocol version used, so later edits do not
          change historical recordings.
        </span>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search protocols..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <section className="content-section">
        {filtered.map((protocol) => (
          <div className="protocol-item" key={protocol.id}>
            <div className="protocol-symbol">☷</div>
            <div className="protocol-main">
              <h2>{protocol.name}</h2>
              <p>
                {protocol.version} · {protocol.status} · Used in{" "}
                {protocol.used} runs
              </p>
            </div>
            <button className="secondary-button">View versions</button>
          </div>
        ))}
      </section>
    </Page>
  );
}

function DatasetsPage({ projects }) {
  return (
    <Page>
      <PageHeading
        eyebrow="COLLECTIONS"
        title="Datasets"
        description="Selected collections of recordings, runs, annotations, and metadata."
        action={<button className="primary-button">+ New dataset</button>}
      />

      <div className="recording-explanation">
        <strong>Datasets are curated collections.</strong>
        <span>
          They are separate from projects because a dataset may contain selected
          recordings from one or several projects.
        </span>
      </div>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <h2>Project collections</h2>
            <p>Datasets can be created later for analysis, sharing, or export.</p>
          </div>
        </div>

        {projects.map((project, index) => (
          <div className="dataset-item" key={project.id}>
            <div className="dataset-symbol">{index + 1}</div>
            <div>
              <strong>
                {index === 0
                  ? "Behavioral training set"
                  : index === 1
                  ? "Cell imaging review"
                  : "Control validation set"}
              </strong>
              <span>
                From {project.name} · {project.recordings} recordings available
              </span>
            </div>
            <button className="text-button">Open →</button>
          </div>
        ))}
      </section>
    </Page>
  );
}

function RecordingWizard({ close, saveRecording }) {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [form, setForm] = useState({
    project: projects[0].name,
    experiment: projects[0].experiments[0],
    runId: "RUN-2026-072",
    protocol: `${protocols[0].name} ${protocols[0].version}`,
    recordingName: "Recording 01",
    operator: "Carrie Tan",
    sampleId: "",
    device: "Camera 1",
    notes: "",
    deviations: "",
  });

  useEffect(() => {
    if (!isRecording) return undefined;

    const timer = setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRecording]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function selectProject(value) {
    const project = projects.find((item) => item.name === value);
    setForm((current) => ({
      ...current,
      project: value,
      experiment: project.experiments[0],
    }));
  }

  function finish() {
    const recording = {
      id: form.runId,
      project: form.project,
      experiment: form.experiment,
      protocol: form.protocol,
      operator: form.operator,
      date: "Jul 27, 2026",
      duration: formatTime(seconds || 1),
      status: form.deviations ? "Needs annotation" : "Completed",
    };

    saveRecording(recording);
  }

  return (
    <div className="modal-backdrop">
      <div className="wizard">
        <div className="wizard-header">
          <div>
            <span className="eyebrow">NEW RECORDING</span>
            <h2>Start an experiment recording</h2>
          </div>
          <button className="close-button" onClick={close}>
            ×
          </button>
        </div>

        <div className="steps">
          <Step number="1" label="Experiment & protocol" active={step === 1} />
          <Step number="2" label="Recording setup" active={step === 2} />
          <Step number="3" label="Record & review" active={step === 3} />
        </div>

        {step === 1 && (
          <div className="wizard-body">
            <StepTitle
              number="Step 1 of 3"
              title="Choose the experiment and protocol"
              text="A recording belongs to a project, experiment, and specific protocol version."
            />

            <Field label="Project">
              <select
                value={form.project}
                onChange={(event) => selectProject(event.target.value)}
              >
                {projects.map((project) => (
                  <option key={project.id}>{project.name}</option>
                ))}
              </select>
            </Field>

            <Field label="Experiment">
              <select
                value={form.experiment}
                onChange={(event) => update("experiment", event.target.value)}
              >
                {projects
                  .find((project) => project.name === form.project)
                  .experiments.map((experiment) => (
                    <option key={experiment}>{experiment}</option>
                  ))}
              </select>
            </Field>

            <Field label="Run ID">
              <input
                value={form.runId}
                onChange={(event) => update("runId", event.target.value)}
              />
            </Field>

            <Field label="Protocol version">
              <select
                value={form.protocol}
                onChange={(event) => update("protocol", event.target.value)}
              >
                {protocols.map((protocol) => (
                  <option key={protocol.id}>
                    {protocol.name} {protocol.version}
                  </option>
                ))}
              </select>
            </Field>

            <div className="info-box">
              The selected protocol version will be saved as a snapshot for this
              run.
            </div>

            <WizardActions
              next={() => setStep(2)}
              nextLabel="Continue to setup →"
              close={close}
            />
          </div>
        )}

        {step === 2 && (
          <div className="wizard-body">
            <StepTitle
              number="Step 2 of 3"
              title="Set up the recording"
              text="Add the information needed to identify the video after it is captured."
            />

            <Field label="Recording name">
              <input
                value={form.recordingName}
                onChange={(event) =>
                  update("recordingName", event.target.value)
                }
              />
            </Field>

            <div className="two-columns">
              <Field label="Operator">
                <input
                  value={form.operator}
                  onChange={(event) => update("operator", event.target.value)}
                />
              </Field>

              <Field label="Sample / subject ID">
                <input
                  placeholder="Optional"
                  value={form.sampleId}
                  onChange={(event) => update("sampleId", event.target.value)}
                />
              </Field>
            </div>

            <Field label="Recording device">
              <select
                value={form.device}
                onChange={(event) => update("device", event.target.value)}
              >
                <option>Camera 1</option>
                <option>Microscope camera</option>
                <option>Screen recording</option>
                <option>Upload video later</option>
              </select>
            </Field>

            <Field label="Pre-recording notes">
              <textarea
                placeholder="Optional notes before recording..."
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
              />
            </Field>

            <WizardActions
              back={() => setStep(1)}
              next={() => setStep(3)}
              nextLabel="Continue to recording →"
              close={close}
            />
          </div>
        )}

        {step === 3 && (
          <div className="wizard-body">
            <StepTitle
              number="Step 3 of 3"
              title="Record and review"
              text="Capture the video, then document any differences from the planned protocol."
            />

            <div className={`recording-console ${isRecording ? "active" : ""}`}>
              <div className="preview-box">
                {isRecording ? (
                  <>
                    <span className="recording-dot" />
                    <strong>Recording in progress</strong>
                    <b>{formatTime(seconds)}</b>
                  </>
                ) : (
                  <>
                    <span className="camera-placeholder">◉</span>
                    <strong>Camera preview</strong>
                    <span>Ready to record</span>
                  </>
                )}
              </div>

              {!isRecording ? (
                <button
                  className="start-button"
                  onClick={() => setIsRecording(true)}
                >
                  ● Start recording
                </button>
              ) : (
                <button
                  className="stop-button"
                  onClick={() => setIsRecording(false)}
                >
                  ■ Stop recording
                </button>
              )}
            </div>

            <div className="recording-summary">
              <Summary label="Run" value={form.runId} />
              <Summary label="Experiment" value={form.experiment} />
              <Summary label="Protocol" value={form.protocol} />
              <Summary label="Device" value={form.device} />
            </div>

            <Field label="Actual procedure / protocol deviations">
              <textarea
                placeholder="Describe anything that differed from the planned protocol..."
                value={form.deviations}
                onChange={(event) => update("deviations", event.target.value)}
              />
            </Field>

            <WizardActions
              back={() => setStep(2)}
              next={finish}
              nextLabel="Save recording"
              close={close}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Page({ children }) {
  return <div className="page">{children}</div>;
}

function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}

function Step({ number, label, active }) {
  return (
    <div className={`step ${active ? "active" : ""}`}>
      <span>{number}</span>
      <b>{label}</b>
    </div>
  );
}

function StepTitle({ number, title, text }) {
  return (
    <div className="step-title">
      <span className="eyebrow">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function Summary({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function WizardActions({ back, next, nextLabel, close }) {
  return (
    <div className="wizard-actions">
      <button className="secondary-button" onClick={back || close}>
        {back ? "← Back" : "Cancel"}
      </button>
      <button className="primary-button" onClick={next}>
        {nextLabel}
      </button>
    </div>
  );
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default App;
