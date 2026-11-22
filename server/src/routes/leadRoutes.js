import { Router } from "express";
import { body, query } from "express-validator";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

const validSources = [
  "Website",
  "LinkedIn",
  "Referral",
  "Cold Call",
  "Email Campaign",
  "Social Media",
  "Other",
];

const validStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Lost",
];

// Validation rules for creating a lead
const createLeadRules = [
  body("name")
    .isString().withMessage("Name must be a string")
    .bail()
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("email")
    .isString().withMessage("Email must be a string")
    .bail()
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("phone")
    .isString().withMessage("Phone must be a string")
    .bail()
    .trim()
    .notEmpty().withMessage("Phone is required")
    .isLength({ min: 7, max: 20 })
    .withMessage("Phone must contain between 7 and 20 characters"),

  body("company")
    .isString().withMessage("Company must be a string")
    .bail()
    .trim()
    .notEmpty().withMessage("Company is required")
    .isLength({ max: 120 }).withMessage("Company name is too long"),

  body("source")
    .isString().withMessage("Source must be a string")
    .bail()
    .isIn(validSources).withMessage("Invalid lead source"),

  body("status")
    .optional()
    .isString().withMessage("Status must be a string")
    .bail()
    .isIn(validStatuses).withMessage("Invalid lead status"),
];

// Validation rules for updating a lead
const updateLeadRules = [
  body("name")
    .optional()
    .isString().withMessage("Name must be a string")
    .bail()
    .trim()
    .notEmpty().withMessage("Name cannot be empty")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("email")
    .optional()
    .isString().withMessage("Email must be a string")
    .bail()
    .trim()
    .notEmpty().withMessage("Email cannot be empty")
    .isEmail().withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .isString().withMessage("Phone must be a string")
    .bail()
    .trim()
    .notEmpty().withMessage("Phone cannot be empty")
    .isLength({ min: 7, max: 20 })
    .withMessage("Phone must contain between 7 and 20 characters"),

  body("company")
    .optional()
    .isString().withMessage("Company must be a string")
    .bail()
    .trim()
    .notEmpty().withMessage("Company cannot be empty")
    .isLength({ max: 120 }).withMessage("Company name is too long"),

  body("source")
    .optional()
    .isString().withMessage("Source must be a string")
    .bail()
    .isIn(validSources).withMessage("Invalid lead source"),

  body("status")
    .optional()
    .isString().withMessage("Status must be a string")
    .bail()
    .isIn(validStatuses).withMessage("Invalid lead status"),
];

// POST /api/leads - Create lead
router.post("/", createLeadRules, validateRequest, createLead);

// GET /api/leads - Get all leads with search and filtering
router.get(
  "/",
  [
    query("search")
      .optional()
      .isString().withMessage("Search must be a string")
      .isLength({ max: 100 }).withMessage("Search is too long"),

    query("status")
      .optional()
      .isIn(["All", ...validStatuses])
      .withMessage("Invalid status filter"),
  ],
  validateRequest,
  getLeads
);

// GET /api/leads/:id - Get individual lead
router.get("/:id", getLeadById);

// PUT /api/leads/:id - Update lead
router.put("/:id", updateLeadRules, validateRequest, updateLead);

// DELETE /api/leads/:id - Delete lead
router.delete("/:id", deleteLead);

export default router;
