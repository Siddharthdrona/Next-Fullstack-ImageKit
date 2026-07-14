import { UploadCloud, ImageIcon, Video, HardDrive, LogOut } from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">ImageVault</h1>
            <p className="text-sm text-slate-500">
              Store, organize and manage your media.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Images</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
              </div>

              <div className="rounded-xl bg-violet-100 p-3">
                <ImageIcon className="text-violet-600" size={28} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Videos</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">0</h2>
              </div>

              <div className="rounded-xl bg-pink-100 p-3">
                <Video className="text-pink-600" size={28} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Storage Used</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">0 MB</h2>
              </div>

              <div className="rounded-xl bg-emerald-100 p-3">
                <HardDrive className="text-emerald-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Upload */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100">
              <UploadCloud className="text-violet-600" size={38} />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-slate-900">
              Upload Media
            </h2>

            <p className="mt-3 text-slate-500">
              Drag & drop your files here or browse from your device.
            </p>

            <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-8 py-14 transition hover:border-violet-500">
              <p className="text-lg font-semibold text-slate-700">
                Drop images & videos here
              </p>

              <p className="mt-2 text-sm text-slate-500">
                JPG • PNG • WEBP • MP4 • MOV
              </p>

              <button className="mt-8 rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition hover:bg-violet-700">
                Choose Files
              </button>
            </div>
          </div>
        </section>

        {/* Recent Uploads */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Uploads
            </h2>

            <button className="text-sm font-medium text-violet-600 hover:underline">
              View All
            </button>
          </div>

          <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
            <div className="text-center">
              <UploadCloud className="mx-auto text-slate-400" size={40} />

              <p className="mt-4 text-slate-500">No uploads yet.</p>

              <p className="text-sm text-slate-400">
                Your uploaded files will appear here.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
