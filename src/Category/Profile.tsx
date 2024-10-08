import Image from "next/image"
import styled from "styled-components"
import { Contents } from "../components/content"
import {sp, pc} from "../styles/media"

const ICON = require('/public/image/my_icon.jpg')

const ProfileDt = styled.dt`
  float: left;
  clear: left;
  width: 6rem;
  margin: 0.25rem 0;
  font-family: 'Rubik Moonrocks', cursive;
`

const ProfileDd = styled.dd`
  float: left;
  margin: 0.25rem 0;
  font-size: 1rem;
  font-family: 'Noto Sans JP', sans-serif;
  ${pc`
    font-size: 1rem;
  `}
  ${sp`
    font-size: 0.5rem;
  `}
`

const ProfileDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfileSpan = styled.span`
  color: #cfffffff;
  ${pc`
    font-size: 1rem;
  `}
  ${sp`
    font-size: 0.75rem
  `}
`

const ProfileH2 = styled.h2`
  color: #cfffffff;
  font-size: 2rem;
`

const profiles = [
  {
    label: "Name",
    content: "酒尾 快都 / Kaito Sakao"
  },
  {
    label: "From",
    content: "石川県金沢市"
  },
  {
    label: "Write",
    content: "Java / Python / Ruby / TypeScript / Go / Kotlin"
  },
  {
    label: "Hobby",
    content: "アニメ鑑賞 / カラオケ / サイクリング"
  },
  {
    label: "Contact",
    content: "kaito071831@gmail.com"
  }
]

export const Profile = () => {
  return(
    <Contents bgColor="#666666">
      <ProfileDiv>
        <div>
          <ProfileH2>Profile</ProfileH2>
          <Image
            src={ICON}
            alt="kaito071831 icon"
            width={250}
            height={300}
          />
          <div>
            <dl>
              {profiles.map((profile) => (
                <ProfileSpan key={profile.label}>
                  <ProfileDt>{profile.label}</ProfileDt>
                  <ProfileDd>{profile.content}</ProfileDd>
                </ProfileSpan>
              ))}
            </dl>
          </div>
        </div>
      </ProfileDiv>
    </Contents>
  )
}
