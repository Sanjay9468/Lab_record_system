import { useState } from 'react'
import { supabase } from '../supabase/client'

export default function LabForm() {
  const [form, setForm] = useState({
    experiment_no: '',
    experiment_title: '',
    aim: '',
    procedure: '',
    program: '',
    output: '',
    result: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!form.experiment_no || !form.experiment_title) {
      alert('Experiment number and title are required')
      return
    }

    const { error } = await supabase.from('submissions').insert([
      {
        experiment_no: Number(form.experiment_no),
        experiment_title: form.experiment_title,
        aim: form.aim,
        procedure: form.procedure,
        program: form.program,
        output: form.output,
        result: form.result,
        status: 'draft'
      }
    ])

    if (error) {
      console.error(error)
      alert('Save failed')
    } else {
      alert('Saved successfully')
      setForm({
        experiment_no: '',
        experiment_title: '',
        aim: '',
        procedure: '',
        program: '',
        output: '',
        result: ''
      })
    }
  }

  return (
    <div className="space-y-4">
      <input
        name="experiment_no"
        placeholder="Experiment No"
        value={form.experiment_no}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <input
        name="experiment_title"
        placeholder="Experiment Title"
        value={form.experiment_title}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <textarea name="aim" placeholder="Aim" value={form.aim} onChange={handleChange} className="w-full border p-2" />
      <textarea name="procedure" placeholder="Procedure" value={form.procedure} onChange={handleChange} className="w-full border p-2" />
      <textarea name="program" placeholder="Program" value={form.program} onChange={handleChange} className="w-full border p-2" />
      <textarea name="output" placeholder="Output" value={form.output} onChange={handleChange} className="w-full border p-2" />
      <textarea name="result" placeholder="Result" value={form.result} onChange={handleChange} className="w-full border p-2" />

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Save
      </button>
    </div>
  )
}