import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.string(),
      height: Yup.string(),
    });

    // Validação de campos com o Yup.
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const stundent = await Student.create(req.body);
    return res.json(stundent);
  }

  async update(req, res) {
    // Verificando se o aluno existe.
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(401).json({ error: 'Student not exist.' });
    }

    // Denição do padrão de objeto com Yup.
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.string(),
      height: Yup.string(),
    });

    // Validação de campos com o Yup.
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails.' });
    }

    const returnUpdate = await student.update(req.body);

    return res.json(returnUpdate);
  }
}

export default new StudentController();
