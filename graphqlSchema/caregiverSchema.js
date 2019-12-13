const { gql } = require('apollo-server-express')

module.exports = gql`
	enum Gender {
		female
		male
		other
		nopref
	}

	enum Availability {
		livein
		liveout
	}

	extend type Subscription {
		receivedJobApplication(input: ApplyJobInput!): Caregiver
	}

	extend type Query {
		getAllCaregivers(input: FilterCaregivers): [Caregiver!]!
		getApplicants(jobId: ID): [Caregiver]
	}

	extend type Mutation {
		applyJob(input: ApplyJobInput): Response
	}

	input FilterCaregivers {
		gender: Gender
		availability: Availability
		hourlyRate: Int
		yearsExperience: Int
	}

	input ApplyJobInput {
		jobId: ID!
		familyId: ID!
		message: String
	}

	type Caregiver {
		userId: ID!
		userDetails: User
		caregiverDetails: CaregiverDetails
	}

	type CaregiverDetails {
		birthdate: String
		yearsExperience: Int
		description: String
		gender: Gender
		availability: Availability
		averageRating: Float
		hourlyRate: Int
	}
`