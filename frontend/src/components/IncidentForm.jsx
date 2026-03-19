export default function IncidentForm({
  form,
  setForm,
  handleSubmit,
  error,
  success,
}) {
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="w-1/3 p-6 border-r border-neonGreen overflow-y-auto">
      <h2 className="text-neonGreen text-2xl font-bold mb-4">
        Report an Incident
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="p-2 rounded border border-neonGreen bg-[#1C1F2B] text-white focus:outline-none focus:ring-2 focus:ring-lightGreen"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="p-2 rounded border border-neonGreen bg-[#1C1F2B] text-white focus:outline-none focus:ring-2 focus:ring-lightGreen"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="p-2 rounded border border-neonGreen bg-[#1C1F2B] text-white focus:outline-none focus:ring-2 focus:ring-lightGreen"
        >
          <option value="THEFT">Theft</option>
          <option value="ACCIDENT">Accident</option>
          <option value="FIRE">Fire</option>
          <option value="VANDALISM">Vandalism</option>
        </select>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="text-white"
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-lightGreen">{success}</p>}

        <button
          type="submit"
          className="bg-gradient-submit py-2 rounded font-bold text-black hover:bg-gradient-submit transition-all"
        >
          Submit Incident
        </button>
      </form>
    </div>
  );
}
