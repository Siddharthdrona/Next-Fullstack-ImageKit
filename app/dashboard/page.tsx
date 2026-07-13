export default function Dashboard() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <div>
            <h1 className="text-3xl font-bold">
              ImageKit Dashboard
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Upload and manage your images & videos.
            </p>
          </div>

          <button className="rounded-lg bg-red-600 px-5 py-2 font-medium hover:bg-red-700">
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-10">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-sm text-zinc-400">Images</h3>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-sm text-zinc-400">Videos</h3>
            <p className="mt-3 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-sm text-zinc-400">Storage Used</h3>
            <p className="mt-3 text-3xl font-bold">0 MB</p>
          </div>
        </div>

        {/* Upload Section */}
        <section className="mt-10 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-10">
          <h2 className="text-2xl font-semibold">
            Upload Media
          </h2>

          <p className="mt-2 text-zinc-400">
            Drag & drop your images or videos here, or browse from your device.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-950 p-14">
            <div className="text-6xl">📤</div>

            <h3 className="mt-4 text-xl font-semibold">
              Upload Images & Videos
            </h3>

            <p className="mt-2 text-center text-zinc-400">
              Supported formats: JPG, PNG, WEBP, MP4, MOV
            </p>

            <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
              Choose Files
            </button>
          </div>
        </section>

        {/* Recent Uploads */}
        <section className="mt-10">
          <h2 className="mb-5 text-2xl font-semibold">
            Recent Uploads
          </h2>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
            No uploads yet.
          </div>
        </section>
      </div>
    </main>
  );
}