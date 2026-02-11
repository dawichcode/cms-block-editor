import { SectionType } from "../blocks/SectionNode";

export interface SectionTemplate {
  type: SectionType;
  name: string;
  description: string;
  icon: string;
  backgroundColor?: string;
  padding?: string;
  content: string; // HTML content
}

export const SECTION_TEMPLATES: SectionTemplate[] = [
  {
    type: 'hero',
    name: 'Hero Section',
    description: 'Large header with title, subtitle, and CTA',
    icon: '🎯',
    backgroundColor: '#667eea',
    padding: '80px 40px',
    content: `
      <h1 style="color: white; text-align: center; font-size: 3em; margin-bottom: 20px;">Welcome to Our Platform</h1>
      <p style="color: white; text-align: center; font-size: 1.5em; margin-bottom: 40px;">Build amazing things with our powerful tools</p>
      <p style="text-align: center;">
        <span style="display: inline-block; padding: 16px 32px; background-color: white; color: #667eea; border-radius: 8px; font-weight: 600; margin: 0 8px;">Get Started</span>
        <span style="display: inline-block; padding: 16px 32px; background-color: transparent; color: white; border: 2px solid white; border-radius: 8px; font-weight: 600; margin: 0 8px;">Learn More</span>
      </p>
    `
  },
  {
    type: 'features',
    name: 'Features Grid',
    description: '3-column feature showcase',
    icon: '⭐',
    backgroundColor: '#f8f9fa',
    padding: '60px 40px',
    content: `
      <h2 style="text-align: center; margin-bottom: 40px;">Our Features</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 3em; margin-bottom: 16px;">🚀</div>
          <h3 style="margin-bottom: 12px;">Fast Performance</h3>
          <p style="color: #666;">Lightning-fast load times and smooth interactions</p>
        </div>
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 3em; margin-bottom: 16px;">🔒</div>
          <h3 style="margin-bottom: 12px;">Secure & Safe</h3>
          <p style="color: #666;">Enterprise-grade security for your data</p>
        </div>
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 3em; margin-bottom: 16px;">💡</div>
          <h3 style="margin-bottom: 12px;">Easy to Use</h3>
          <p style="color: #666;">Intuitive interface that anyone can master</p>
        </div>
      </div>
    `
  },
  {
    type: 'cta',
    name: 'Call to Action',
    description: 'Centered CTA with button',
    icon: '📢',
    backgroundColor: '#28a745',
    padding: '60px 40px',
    content: `
      <h2 style="color: white; text-align: center; margin-bottom: 20px;">Ready to Get Started?</h2>
      <p style="color: white; text-align: center; font-size: 1.2em; margin-bottom: 30px;">Join thousands of satisfied customers today</p>
      <p style="text-align: center;">
        <span style="display: inline-block; padding: 16px 48px; background-color: white; color: #28a745; border-radius: 8px; font-weight: 600; font-size: 1.1em;">Sign Up Now</span>
      </p>
    `
  },
  {
    type: 'testimonial',
    name: 'Testimonial',
    description: 'Customer testimonial with quote',
    icon: '💬',
    backgroundColor: '#ffffff',
    padding: '60px 40px',
    content: `
      <div style="max-width: 800px; margin: 0 auto; text-align: center;">
        <div style="font-size: 4em; color: #667eea; margin-bottom: 20px;">"</div>
        <p style="font-size: 1.3em; font-style: italic; color: #333; margin-bottom: 30px;">This product has completely transformed how we work. The team is more productive and our customers are happier than ever.</p>
        <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: #667eea;"></div>
          <div style="text-align: left;">
            <div style="font-weight: 600; color: #333;">John Smith</div>
            <div style="color: #666; font-size: 0.9em;">CEO, Tech Company</div>
          </div>
        </div>
      </div>
    `
  },
  {
    type: 'pricing',
    name: 'Pricing Table',
    description: '3-tier pricing comparison',
    icon: '💰',
    backgroundColor: '#f8f9fa',
    padding: '60px 40px',
    content: `
      <h2 style="text-align: center; margin-bottom: 40px;">Choose Your Plan</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; max-width: 1000px; margin: 0 auto;">
        <div style="background: white; padding: 30px; border-radius: 12px; border: 2px solid #e9ecef; text-align: center;">
          <h3 style="margin-bottom: 16px;">Starter</h3>
          <div style="font-size: 2.5em; font-weight: 700; color: #667eea; margin-bottom: 20px;">$9<span style="font-size: 0.4em; color: #666;">/mo</span></div>
          <ul style="list-style: none; padding: 0; margin-bottom: 30px; text-align: left;">
            <li style="padding: 8px 0;">✓ 10 Projects</li>
            <li style="padding: 8px 0;">✓ 5GB Storage</li>
            <li style="padding: 8px 0;">✓ Email Support</li>
          </ul>
          <span style="display: block; padding: 12px 24px; background: #667eea; color: white; border-radius: 6px; font-weight: 600;">Get Started</span>
        </div>
        <div style="background: white; padding: 30px; border-radius: 12px; border: 3px solid #667eea; text-align: center; transform: scale(1.05);">
          <div style="background: #667eea; color: white; padding: 4px 12px; border-radius: 4px; font-size: 0.8em; margin-bottom: 12px;">POPULAR</div>
          <h3 style="margin-bottom: 16px;">Pro</h3>
          <div style="font-size: 2.5em; font-weight: 700; color: #667eea; margin-bottom: 20px;">$29<span style="font-size: 0.4em; color: #666;">/mo</span></div>
          <ul style="list-style: none; padding: 0; margin-bottom: 30px; text-align: left;">
            <li style="padding: 8px 0;">✓ Unlimited Projects</li>
            <li style="padding: 8px 0;">✓ 50GB Storage</li>
            <li style="padding: 8px 0;">✓ Priority Support</li>
          </ul>
          <span style="display: block; padding: 12px 24px; background: #667eea; color: white; border-radius: 6px; font-weight: 600;">Get Started</span>
        </div>
        <div style="background: white; padding: 30px; border-radius: 12px; border: 2px solid #e9ecef; text-align: center;">
          <h3 style="margin-bottom: 16px;">Enterprise</h3>
          <div style="font-size: 2.5em; font-weight: 700; color: #667eea; margin-bottom: 20px;">$99<span style="font-size: 0.4em; color: #666;">/mo</span></div>
          <ul style="list-style: none; padding: 0; margin-bottom: 30px; text-align: left;">
            <li style="padding: 8px 0;">✓ Unlimited Everything</li>
            <li style="padding: 8px 0;">✓ 500GB Storage</li>
            <li style="padding: 8px 0;">✓ 24/7 Support</li>
          </ul>
          <span style="display: block; padding: 12px 24px; background: #667eea; color: white; border-radius: 6px; font-weight: 600;">Contact Sales</span>
        </div>
      </div>
    `
  },
  {
    type: 'team',
    name: 'Team Members',
    description: 'Team member cards',
    icon: '👥',
    backgroundColor: '#ffffff',
    padding: '60px 40px',
    content: `
      <h2 style="text-align: center; margin-bottom: 40px;">Meet Our Team</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;">
        <div style="text-align: center;">
          <div style="width: 120px; height: 120px; border-radius: 50%; background: #667eea; margin: 0 auto 16px;"></div>
          <h4 style="margin-bottom: 8px;">Alice Johnson</h4>
          <p style="color: #666; font-size: 0.9em;">CEO & Founder</p>
        </div>
        <div style="text-align: center;">
          <div style="width: 120px; height: 120px; border-radius: 50%; background: #28a745; margin: 0 auto 16px;"></div>
          <h4 style="margin-bottom: 8px;">Bob Smith</h4>
          <p style="color: #666; font-size: 0.9em;">CTO</p>
        </div>
        <div style="text-align: center;">
          <div style="width: 120px; height: 120px; border-radius: 50%; background: #ffc107; margin: 0 auto 16px;"></div>
          <h4 style="margin-bottom: 8px;">Carol White</h4>
          <p style="color: #666; font-size: 0.9em;">Lead Designer</p>
        </div>
        <div style="text-align: center;">
          <div style="width: 120px; height: 120px; border-radius: 50%; background: #dc3545; margin: 0 auto 16px;"></div>
          <h4 style="margin-bottom: 8px;">David Brown</h4>
          <p style="color: #666; font-size: 0.9em;">Marketing Director</p>
        </div>
      </div>
    `
  },
  {
    type: 'stats',
    name: 'Statistics',
    description: 'Key metrics display',
    icon: '📊',
    backgroundColor: '#667eea',
    padding: '60px 40px',
    content: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; text-align: center;">
        <div>
          <div style="font-size: 3em; font-weight: 700; color: white; margin-bottom: 8px;">10K+</div>
          <div style="color: rgba(255,255,255,0.9); font-size: 1.1em;">Active Users</div>
        </div>
        <div>
          <div style="font-size: 3em; font-weight: 700; color: white; margin-bottom: 8px;">50+</div>
          <div style="color: rgba(255,255,255,0.9); font-size: 1.1em;">Countries</div>
        </div>
        <div>
          <div style="font-size: 3em; font-weight: 700; color: white; margin-bottom: 8px;">99.9%</div>
          <div style="color: rgba(255,255,255,0.9); font-size: 1.1em;">Uptime</div>
        </div>
        <div>
          <div style="font-size: 3em; font-weight: 700; color: white; margin-bottom: 8px;">24/7</div>
          <div style="color: rgba(255,255,255,0.9); font-size: 1.1em;">Support</div>
        </div>
      </div>
    `
  },
  {
    type: 'faq',
    name: 'FAQ Section',
    description: 'Frequently asked questions',
    icon: '❓',
    backgroundColor: '#f8f9fa',
    padding: '60px 40px',
    content: `
      <h2 style="text-align: center; margin-bottom: 40px;">Frequently Asked Questions</h2>
      <div style="max-width: 800px; margin: 0 auto;">
        <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin-bottom: 12px;">How do I get started?</h3>
          <p style="color: #666;">Simply sign up for an account and follow our quick start guide. You'll be up and running in minutes!</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin-bottom: 12px;">What payment methods do you accept?</h3>
          <p style="color: #666;">We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</p>
        </div>
        <div style="background: white; padding: 24px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="margin-bottom: 12px;">Can I cancel anytime?</h3>
          <p style="color: #666;">Yes! You can cancel your subscription at any time with no penalties or hidden fees.</p>
        </div>
      </div>
    `
  },
  {
    type: 'contact',
    name: 'Contact Form',
    description: 'Contact information and form',
    icon: '📧',
    backgroundColor: '#ffffff',
    padding: '60px 40px',
    content: `
      <h2 style="text-align: center; margin-bottom: 40px;">Get In Touch</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1000px; margin: 0 auto;">
        <div>
          <h3 style="margin-bottom: 20px;">Contact Information</h3>
          <div style="margin-bottom: 20px;">
            <div style="font-weight: 600; margin-bottom: 8px;">📍 Address</div>
            <p style="color: #666;">123 Business St, Suite 100<br/>San Francisco, CA 94105</p>
          </div>
          <div style="margin-bottom: 20px;">
            <div style="font-weight: 600; margin-bottom: 8px;">📧 Email</div>
            <p style="color: #666;">contact@example.com</p>
          </div>
          <div style="margin-bottom: 20px;">
            <div style="font-weight: 600; margin-bottom: 8px;">📞 Phone</div>
            <p style="color: #666;">+1 (555) 123-4567</p>
          </div>
        </div>
        <div>
          <h3 style="margin-bottom: 20px;">Send us a Message</h3>
          <p style="color: #666; margin-bottom: 12px;"><strong>Name:</strong> [Your Name]</p>
          <p style="color: #666; margin-bottom: 12px;"><strong>Email:</strong> [Your Email]</p>
          <p style="color: #666; margin-bottom: 12px;"><strong>Message:</strong> [Your Message]</p>
          <span style="display: inline-block; padding: 12px 32px; background: #667eea; color: white; border-radius: 6px; font-weight: 600; margin-top: 12px;">Send Message</span>
        </div>
      </div>
    `
  },
  {
    type: 'newsletter',
    name: 'Newsletter Signup',
    description: 'Email subscription form',
    icon: '📬',
    backgroundColor: '#667eea',
    padding: '60px 40px',
    content: `
      <div style="max-width: 600px; margin: 0 auto; text-align: center;">
        <h2 style="color: white; margin-bottom: 16px;">Subscribe to Our Newsletter</h2>
        <p style="color: rgba(255,255,255,0.9); font-size: 1.1em; margin-bottom: 30px;">Get the latest updates and exclusive content delivered to your inbox</p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <span style="flex: 1; max-width: 400px; padding: 14px 20px; background: white; border-radius: 6px; text-align: left; color: #999;">Enter your email</span>
          <span style="padding: 14px 32px; background: #28a745; color: white; border-radius: 6px; font-weight: 600;">Subscribe</span>
        </div>
        <p style="color: rgba(255,255,255,0.7); font-size: 0.9em; margin-top: 16px;">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    `
  }
];
