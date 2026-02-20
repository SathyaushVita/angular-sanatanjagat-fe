import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  constructor(){}


  advisors = [
   
    {
      name: 'Dr. Ravi Aiyyar',
      image: "assets/images/Ravi Aiyyar.jpg",
      bio: 'Dr.Ravi Kumar is a member of All India Sampark Toli of RSS. His headquarters is in Mumbai. Ravi Kumar completed engineering from the prestigious Madras Institute of Technology, Chennai in 1970. During his college days, he was All India General Secretary of Akhil Bharatiya Vidyarthi Parishad (1969-70). ABVP is considered the largest student organization in the world. He served as Project Engineer for five years and left his job with M/S Larsen & Toubro in 1975 to serve society as an RSS Pracharak. He worked among the youth of Gujarat and the tribals of Maharashtra. For 36 years from 1982 to 2018, Ravi Kumar travelled regularly to 45 countries to serve the Indian society under Sewa International. During this period his headquarters were in Hong Kong, Bangkok, and Sydney, Australia. He has conducted more than 300 Yoga camps and more than 500 workshops on Vedic Mathematics in over 40 countries in many universities and socio-cultural institutions.'

   
    },
   
    {

      name: 'Dr. Anadi Sahoo',
      image: "assets/images/Dr. Anadi Sahoo.jpg",
      bio: 'Dr. Anadi Sahoo is the Founder of Spiritual Bharat, a Spiritual Educational Institute where academic, social, and religious values are taught. He is also a renowned thought leader in Hinduism and has completed a 12-year Gurukul spiritual training from the Nath Sampradaya. Additionally, he is a spiritual scientist, author, and trainer, known for his profound insights shared through over 150 spiritual articles featured on the Speaking Tree of Times of India. Dr. Sahoo"s commitment is to impart principles and practices for genuine happiness, especially to those earnestly seeking spiritual growth. He also sheds light on the inclusive essence of Hinduism and discusses the intersection of Hinduism with other communities in exercising an inclusive viewpoint.'

    },

    {
      name: 'Dr. B. Srinivasulu',
      image: "assets/images/srinavas.jpg",
      bio: "Dr. B. Srinivasulu, M.Sc (Ag), Ph.D. Former Registrar, Director of Extension, Controller of Examinations, Principal Scientist, Director -Planning and Monitoring cell at Horticultural University, Andhra Pradesh. Severed as a professor for 21 years and university officer for 14 years in a total service of 39 years. Also held positions as Director of Research, Dean of Horticulture, Dean of Student Affairs, Dean of PG Studies, Director of Industrial and International Programs, Comptroller and Estate Officer. Published 7 books, 8 chapters in textbooks, 60 technical bulletins, 150 research papers and 200 popular articles. Recipient of 13 awards / recognitions."

    }
    
  ];

  founders = [
    
    // {
    //   title:'Chairman',
    //   name: ' Soundarajan Narendran',
    //   image: 'assets/images/Soundarajan Narendran.jpg',
    //   bio: 'Soundarajan Narendran is a data scientist with over 25 years of experience in both business and government. From 1998 to 2007, he worked for Apollo Tyres and the TVS Group on product development, business channel development and supply chains. Since 2007, Narendran has worked on policy making, public policy and digital government. He has experience of working with non-governmental organizations, governments and global institutions on big data, social media analytics and sentiment analysis. Educated at IIT Chennai and Anna University, Narendran has an interest in spirituality and narrative development.'
    // },

    {
      title:'Founder & CEO',
      name:'Nalabolu Vishnu Roy',
      image:'../../assets/images/founder.jpg',
      // bio:'Nalabolu Vishnu Roy is the founder of Gramadevata Foundation, a company dedicated to providing innovative technology solutions. With a passion for driving technological advancements and fostering growth, Vishnu Roy has led the company with a vision to create impactful tech solutions that address real-world challenges. Under his leadership, Sathayush Tech Solutions has achieved significant milestones and continues to be at the forefront of technological innovation.',
      bio:' Mr. Vishnu, with a Master’s degree from Osmania University (1994), has been driven by a passion for both technology and social service. Beginning as a Software Consultant, Vishnu mentored over 2500+ graduates, guiding them to successful careers. Over the past 20 years, Vishnu’s focus has shifted to working closely with social organizations, NGOs, and the media to bring about positive change. His work has included organizing medical camps, contributing to community-based educational programs, and advocating for cultural preservation. Vishnu remains committed to addressing important social issues while preserving cultural and spiritual heritage through these efforts. Looking to the future, Vishnu aims to expand his initiatives further, striving to create sustainable solutions and foster greater social impact.'
    },

    {
      title:'Director',
      name:'Mr. Sharat',
      image:'../../assets/images/Sharat.jpg',
      bio:'Mr. Sharat is an astute, strategic person and an active social worker with a strong foothold in Hindu communities. he holds a rich and productive experience in the arena of social services. His ability to reach out and interact with various strata of the society and his active participation in the establishment of numerous get togethers of Hindu communities  in and around India (Nellore, Nalgonda, Vijayawada, Hyderabad), abroad (UK,USA, Singapore) has earned him accolades. He made healthy relations with local and national leaders and was awarded for remarkable work towards social welfare.'
    }

  ]



}
