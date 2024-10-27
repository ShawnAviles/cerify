import { Caregiver } from "../models/Cargiver.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const caregiver = await Caregiver.login(email, password);
    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  try {
    const newCaregiver = await Caregiver.signup(username, email, password, firstName, lastName);
    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { email, firstName, lastName, username } = req.body;

  try {
    const updatedCaregiver = await Caregiver.updateProfile(
      email,
      firstName,
      lastName,
      username
    );
    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const updatedCaregiver = await Caregiver.updatePassword(email, password);
    res.status(200).json({ email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getInfo = async (req, res) => {
  const { email } = req.body;

  try {
    const caregiver = await Caregiver.getInfo(email);
    res.status(200).json({ caregiver });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { login, signup, updateProfile, updatePassword, getInfo };
