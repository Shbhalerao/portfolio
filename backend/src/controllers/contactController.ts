import { Request, Response } from 'express';
import Contact from '../models/Contact';

const submitContactForm = async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ message: 'Please enter all required fields: name, email, message' });
    return;
  }

  try {
    const contactMessage = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message sent successfully!', data: contactMessage });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const getContactMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Contact.find({});
    messages.sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());
    res.json(messages);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const message = await Contact.findById(req.params.id);

    if (message) {
      await Contact.deleteOne({ _id: message._id });
      res.json({ message: 'Contact message removed' });
    } else {
      res.status(404).json({ message: 'Contact message not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { submitContactForm, getContactMessages, deleteContactMessage };
